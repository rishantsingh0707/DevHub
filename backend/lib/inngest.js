import { Inngest } from "inngest"
import User from "../models/user.js"
import { connectDB } from "./db.js"

export const inngest = new Inngest({ id: "Devhub" })

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },

    async ({ event }) => {

        await connectDB()

        const { id, email_addresses, first_name, last_name, image_url } = event.data

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ''} ${last_name || ''}`,
            profilePicture: image_url || '',
        }

        await User.create(newUser)
    })

const deleteUser = inngest.createFunction(
    { id: "delete-user" },
    { event: "clerk/user.deleted"},

    async ({ event }) => {

        await connectDB()

        const { id } = event.data

        await User.deleteOne({ clerkId: id })
    })

export const functions = [syncUser, deleteUser]