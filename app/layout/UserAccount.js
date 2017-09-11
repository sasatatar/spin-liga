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
                id: user.uid,
                isAdmin: false
            }
        );
        // check if user is admin
        database.ref('admin').once('value')
            .then(snapshot => {
                let isAdmin = snapshot.hasChild(user.uid);
                this.store.update('user', user => ({ ...user, isAdmin }));
            })
            .catch(e => {});
    }
}

export default <cx>
    <PureContainer controller={AuthController}>
        <Link
            href="~/sign-in"
            url={bind("url")}
            class="nav-user"
            visible={expr("!!{user.id}")}
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
            visible={expr("!{user.id}")}
        >
            Sign In
		</Link>
    </PureContainer>
</cx>
