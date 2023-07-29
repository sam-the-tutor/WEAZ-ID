import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Error "mo:base/Error";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";

//import types and interface for the wallet
import WIC "walletTypes";

//import types for the Management canister
import managementCanister "types";

//Overview
// user specifies the Principal ID that he wants to create a wallet for.
//We create an empty canister and installs the wallet wasm inside it.
//We then change the controller to the Principal ID that the user provided.
// We store the infirmation about the wallets and their corresponding controllers in a hashmap so that hhe user can track them.
// Users will be able to delete wallets so as to redeem the cycles inside them

//declare an actor class for the WEAZID canister
actor class WeazID() = this {

    //typ
    public type Time = Time.Time;

    //Record to store details about the created wallet
    public type Details = {
        walletName : Text;
        canID : Principal;
        controller : Principal;
        date : Time;
    };

    //variable to store the wallet wasm.
    //it has tobe uploaded before the platform can be used
    stable var wasmContent : [Nat8] = [];

    //initializing the management canister.
    let ic : managementCanister.IC = actor ("aaaaa-aa");

    //hashmap to store details about the created wallet
    private var userAccount = HashMap.HashMap<Principal, Buffer.Buffer<Details>>(0, Principal.equal, Principal.hash);

    //stable array to store data during upgrades
    private stable var userAccountArray : [(Principal, Details)] = [];

    // Set up a new Wallet
    public shared ({ caller }) func setMyWallet(_walletName : Text, contID : Principal) : async Result.Result<{ canister_id : managementCanister.canister_id }, Text> {

        let settings = {
            freezing_threshold = ?2_592_000;
            controllers = ?[contID, Principal.fromActor(this)];
            memory_allocation = null;
            compute_allocation = null;

        };

        Cycles.add(100_000_000_000); //1 billion cycles is required to create a new empty canister

        try {

            //create an empty wallet canister
            let canister_id = await ic.create_canister({ settings = ?settings });

            let installSettings = {
                arg = [];
                wasm_module = wasmContent;
                mode = #install;
                canister_id = canister_id.canister_id;

            };

            let walletSettings = {
                controller = ?contID;
                freezing_threshold = ?2_592_000;
                controllers = ?[contID, Principal.fromActor(this)];
                memory_allocation = null;
                compute_allocation = null;

            };

            //deposit some cycles inside the canister to begin with
            Cycles.add(100_000_000_000);
            let depC = await ic.deposit_cycles(canister_id);

            //install the wasm code inside the wallet canister
            let insRes = await ic.install_code(installSettings);

            //set real wallet controllers
            let walletIC : WIC.IC = actor (Principal.toText(canister_id.canister_id));

            let result = await walletIC.wallet_create_canister({
                cycles : Nat64 = 0;
                settings = walletSettings;
            });
            let resulta = await walletIC.add_controller(contID); //add principal Id as a wallet controller
            let result2 = await walletIC.remove_controller(Principal.fromActor(this)); //remove this canister from the wallet controllers

            //store the wallet canister details in the storage
            switch (userAccount.get(caller)) {
                case (null) {

                    let newBuf = Buffer.Buffer<Details>(0);

                    let newEntry : Details = {
                        walletName = _walletName;
                        canID = canister_id.canister_id;
                        controller = contID;
                        date = Time.now();
                    };

                    //add entry in the storage and return ok
                    newBuf.add(newEntry);
                    userAccount.put(caller, newBuf);
                    return #ok(canister_id);
                };

                case (?accounts) {

                    let newBuf = accounts;

                    let newEntry : Details = {
                        walletName = _walletName;
                        canID = canister_id.canister_id;
                        controller = contID;
                        date = Time.now();
                    };

                    newBuf.add(newEntry);
                    userAccount.put(caller, newBuf);

                    return #ok(canister_id);
                };
            };

            return #ok(canister_id);

        } catch (error) {
            #err(Error.message(error));
        };

    };

    //upload the wallet wasm to the canister
    public func uploadWasm(wasmBlob : [Nat8]) : async Result.Result<(), Text> {
        try {
            wasmContent := wasmBlob;
            #ok();

        } catch (error) {
            #err(Error.message(error));
        };
    };

    //get all the account entries for a particluar user ID
    public query func getallIDS(caller : Text) : async Result.Result<[Details], Text> {
        switch (userAccount.get(Principal.fromText(caller))) {
            case (null) {
                #err("No account found");
            };
            case (?values) {
                #ok(Iter.toArray(values.vals()));
            };
        };
    };

    //not so important since it is available in dfx
    //get the status of the canister using the management canister API
    public func getCanStatus(id : Text) : async Result.Result<managementCanister.definite_canister_settings, Text> {
        try {

            let result = await ic.canister_status({
                canister_id = Principal.fromText(id);
            });
            return #ok(result.settings);

        } catch (error) {

            #err(Error.message(error));

        };

    };

    //get cycles balance for the backend canister
    public func getCyclesbalance() : async Nat {
        return Cycles.balance();
    };

    //get the total number of wallets created so far
    public query func getTotalWallets() : async Nat {
        var sum : Nat = 0;
        for (user in userAccount.vals()) {
            sum := user.size();
        };
        return sum;
    };
};
