import { Inngest } from "inngest"
import { connectDB } from "./db.js"
import User from "../models/User.js"
import { upsertStreamUser, deleteStreamUser } from "./stream.js"

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
            userName: `${first_name || ''} ${last_name || ''}`,
            profilePicture: image_url || '',
        }

        await User.create.users(newUser)
        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.userName,
            image: newUser.profilePicture
        })

console.log("User synced successfully", newUser)

    });

const deleteUser = inngest.createFunction(
    { id: "delete-user" },
    { event: "clerk/user.deleted" },

    async ({ event }) => {

        await connectDB()

        const { id } = event.data

        await User.deleteOne({ clerkId: id })
        await deleteStreamUser(id.toString())
    })

export const functions = [syncUser, deleteUser]