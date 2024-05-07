import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Tables } from '../../types/supabase'

export type User = Tables<'user_info'>

type UserState = {
    user: null | User
    setUser: (user: User) => void
    clearUser: () => void
    organizations: Tables<'organization'>[]
    setOrganizations: (organizations: Tables<'organization'>[]) => void
    addOrganization: (organization: Tables<'organization'>) => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null, organizations: [] }),
            organizations: [],
            setOrganizations: (organizations) => set({ organizations }),
            addOrganization: (organization) => set((state) => ({
                organizations: [...state.organizations, organization],
                user: {
                    ...state.user!,
                    organization_id: [...(state.user?.organization_id ?? []), organization.organization_id]
                }
            }))
        }),
        {
            name: 'user-storage'
        }
    )
)