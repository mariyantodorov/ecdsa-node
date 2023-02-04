import * as secp  from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

//address => private key
const users = new Map([
    ["39D593B807F7C9032BB68832C309F38F09DC73EB", "fd0e2a6202e0f64fdaa9088d81194b7964c2aea3147642b3606a2a746e698549"], //044ea72c9dd6aabd0ecb7915023593d6c0129bfb99ff705f1c4de2c827c977094cc7cc0b7225b7da6b43eeee7b49680dd4f67b407e5ea672be8641f4a2dbed9310
    ["ED95ABD05D1E4556C126B6A8F0B212844F013829", "858b92fda873b6f8eedc9ed42a7eb2fdd0a21de59ddc6eec430029ed1d0a0f3d"], //04e2d9a1a96f19121f951040a0e13699df2c38babd29dd6e29de4a43e27c29d25963e4487e9f5b948cbad5447cb53c6ac60f25f821cf43387bee1ee5fbeb4cdde5
    ["0081EFBFFEABB8425389C7D0E54E51D8621304C6", "e775a30da74e6e73175c567b1096d145f876335fb3aec97c0f86727d5a197569"]  //04223411426feccdff12341a01ade7491f6720bd2470c32f34054193cbe6cef44c4d7465b6b69a582cc99d4f3e6d8a0a1b30450718c449322d8e17cd3499b5c07c
]);

const hashMessage = async(msg) => keccak256(Uint8Array.from(msg));

const signMessage = async(address, msg) => {
    const msgHash = await hashMessage(msg);
    const [signature, recoveryBit] = await secp.sign(msgHash, users.get(address), { recovered: true });
    const fullSignature = new Uint8Array([recoveryBit, ...signature]);
    return toHex(fullSignature);
} 

const wallet = {
    users,
    signMessage
}

export default wallet;