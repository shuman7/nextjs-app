import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/client";

export const login = () => {
    const provider = new GoogleAuthProvider();

    // 処理A
    // 処理B
    // 処理C
    // 処理D
    // 処理E
    return signInWithPopup(auth, provider)
    .then((result) => { //成功したら
        alert(`${result.user.displayName}さんこんにちは`)
    })
    .catch((e) => console.log(e)) //失敗したら
}

export const logout = () => {
    return signOut(auth).then(() => {
        alert('サインアウト完了');
    })
}