import { PureContainer, Link, Text } from 'cx/widgets';
import { Controller, bind, expr } from "cx/ui";

import { auth, database } from '../api';
//import database from '../api';

class AuthController extends Controller {
    onInit() {
        auth.onAuthStateChanged((user) => this.updateUser(user));
    }

    updateUser(user) {
        this.store.set(
            "user",
            user && {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid,
                isAdmin: true
            }
        );

        // check if user is admin
        if (!user) return;
        database.ref(`/admins/${user.uid}`).once('value', snapshot => {
                //debugger;
                console.log('-----------------------------------', snapshot.val());
                let isAdmin = !!snapshot.val();
                this.store.update('user', user => ({ ...user, isAdmin }));
            });
    }
}

export default <cx>
    <PureContainer controller={AuthController}>
        <Link
            href="~/sign-in"
            url={bind("url")}
            class="nav-user"
            visible={expr("!!{user.uid}")}
        >
            <img
                src={bind("user.photoURL")}
                style="height: 40px; border-radius: 50%; display: block;"
            />
        </Link>
        <Link
            href="~/sign-in"
            url={bind("url")}
            mod="top"
            visible={expr("!{user.uid}")}
        >
            Sign In
		</Link>
    </PureContainer>
</cx>
