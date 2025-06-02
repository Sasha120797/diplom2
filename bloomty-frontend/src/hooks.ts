import { useEffect, useMemo, useState } from "react";
import { OrderRequests } from "./axios/orderRequests";
import { IOrderExtended } from "./types/Order";
import { useDispatch } from "react-redux";
import { addError } from "./store/errors/errors";

export const useFetchOrders = (orderIds: string[] | undefined) => {

    const dispatch = useDispatch();

    const [orders, setOrders] = useState<IOrderExtended[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!orderIds || orderIds.length === 0) {
            setOrders([]);
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                setLoading(true);
                const fetchedOrders = await Promise.all(
                    orderIds.map(async (id) => {
                        const response = await OrderRequests.getOrder(id);
                        return response.data;
                    })
                );
                setOrders(fetchedOrders);
            } catch (err: any) {
                dispatch(addError({
                    code: err.response.data.statusCode || "500",
                    message: err.response.data.message || "Произошла ошибка в приложении",
                    path: err.response.data.path || ""
                }))
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [orderIds]); // <-- Важно! Зависимость только на `orderIds`

    return { orders, loading, error };
};