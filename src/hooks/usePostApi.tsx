"use client"
import { axiosPrivate } from '@/helper/axiosPrivate';
import { baseUrl } from '@/helper/constants';
import { useState } from 'react';

export default function usePostApi(url: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (body: any) => {
        setLoading(true);
        try {
            const result = await axiosPrivate.post(baseUrl + url, body);
            setData(result.data);
            return result.data;
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, postData };
}
