import { useContext, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/theme/button";
import { Input } from "../../components/theme/input";
import Text from "../../components/theme/text";
import { AppContext } from "../../contexts/app-context";
import { Screen } from "../../layouts/screen";
import { Colors } from "../../utils/constants";
import { post } from "../../utils/http";
import { validate } from "../../utils/validator";

export default function RegisterScreen({ navigation }) {
	const [fullNames, setFullNames] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function register() {
		let data = { fullNames, username, email, password };

		let [passes, info] = validate(data, {
			fullNames: "required",
			username: "required",
			email: "required|email",
			password: "required",
		});

		if (!passes) {
			Alert.alert("Bad Request", info[0][0]);
			return;
		}

		try {
			let res = await post("api/auth/register", data);

			if (res.password != undefined) {
				Alert.alert("Success", "Registration Successful");
				navigation.navigate("Login");
			} else {
				Alert.alert("Bad Request", "Check if your fields are valid");
			}
		} catch (error) {}
	}

	return (
		<Screen mt>
			<View
				style={{
					marginTop: 20,
				}}
			>
				<Text size={30} medium align="center" color={Colors.primary}>
					Hello. have an account
				</Text>
			</View>
			<View style={{ marginTop: 30 }}>
				<Input label="Full names" handler={setFullNames} />
				<Input label="Email" handler={setEmail} />
				<Input label="username" handler={setUsername} />
				<Input label="Password" handler={setPassword} password />
			</View>
			<Button title="Create" onPress={register} />
			<View>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Login");
					}}
				>
					<Text align="center" color={Colors.primary}>
						Already Have an account ?
					</Text>
				</TouchableOpacity>
			</View>
		</Screen>
	);
}
