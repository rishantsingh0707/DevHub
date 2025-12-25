import { sessionApi } from '../api/session';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useJoinSession = () => {
    return useMutation({
        mutationFn: (id) => sessionApi.joinSession(id),
        onSuccess: () => {
            toast.success("Join Room Successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Unable to join Room");
        },
    });
};


export const useEndSession = (id) => {
    return useMutation({
        mutationFn: () => sessionApi.endSession(id),
        onSuccess: () => {
            toast.success("Ended Session Successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Unable to leave room");
        },
    });
};


export const useCreateSession = () => {
    return useMutation({
        mutationFn: sessionApi.createSessions,
        onSuccess: () => {
            toast.success("Session Created Successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create Session!");
            console.error("Error creating session:", error);
        },
    });
};


export const useActiveSessions = () => {
    return useQuery({
        queryKey: ['active-sessions'],
        queryFn: sessionApi.getActiveSessions,
    });
};


export const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey: ['MyRecentSession'],
        queryFn: () => sessionApi.getMyRecentSessions,
    });
    return result;
}

export const useSessionById = (id) => {
    return useQuery({
        queryKey: ['session', id],
        queryFn: () => sessionApi.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000,
    });
};
