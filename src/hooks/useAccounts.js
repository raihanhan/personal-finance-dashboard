import { useEffect, useState } from "react";

import { getAccounts } from "../services/accountService";
import { useAuth } from "./useAuth";

export function useAccounts() {
	const { user } = useAuth();
	const [accounts, setAccounts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user) {
			void Promise.resolve().then(() => {
				setAccounts([]);
				setLoading(false);
			});
			return;
		}

		void Promise.resolve().then(() => setLoading(true));
		void getAccounts().then(({ data, error }) => {
			if (!error) {
				setAccounts(data || []);
			}
			setLoading(false);
		});
	}, [user]);

	return { accounts, loading };
}
