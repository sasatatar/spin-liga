import {Section, Text, Button} from 'cx/widgets';
import { expr } from 'cx/ui';

import Controller from './Controller';

export default () => <cx>
 	<h2 putInto="header">Sign in</h2>
	<div class="center" controller={Controller} >
		<Section title="Sign In" visible={expr("!{user.uid}")}>
			<p>
				Ulogujte se za pristup administrativnom panelu.
			</p>
			<p>
				<a href="#" onClick="signInWithGoogle">
                    <img src="~/assets/sign-in/google/btn_google_signin_dark_normal_web.png" />
				</a>
			</p>
		</Section>

		<Section title="User Info" visible={expr("!!{user.uid}")} ws>
			<p ws>
				Ulogovani ste kao <Text tpl="{user.displayName}{user.email:wrap; (;)}" />.
			</p>

			<Button onClick="signOut" mod="hollow">
				Sign Out
			</Button>
		</Section>
	</div>
</cx>
