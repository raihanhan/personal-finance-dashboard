import { useEffect, useState } from "react";

import { getTransactions } from "../services/transactionService";
import { useAuth } from "./useAuth";

export function useTransactions() {
	const { user } = useAuth();
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user) {
			void Promise.resolve().then(() => {
				setTransactions([]);
				setLoading(false);
			});
			return;
		}

		void Promise.resolve().then(() => setLoading(true));
		void getTransactions().then(({ data, error }) => {
			if (!error) {
				setTransactions(data || []);
			}
			setLoading(false);
		});
	}, [user]);

	return { transactions, loading };
}
