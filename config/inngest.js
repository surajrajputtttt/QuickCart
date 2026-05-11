// src/inngest/client.ts
import { Inngest } from "inngest";
import connectDB from "./db";
import user from "@/models/users";

export const inngest = new Inngest({ id: "quickcart-next" });

// inngest function to save user data to a database
export const SyncUserCreation = inngest.createFunction(
  {
    id: 'sync-user-from-clerk'
  },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + ' ' + last_name,
      image_url: image_url
    }
    await connectDB()
    await user.create(userData)
  }
)

// inngest function to update data in database
export const syncuserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {
        event: 'clerk/user.update'},
        async ({event}) =>{
             const { id, first_name, last_name, email_addresses, image_url } = event.data;
    
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + ' ' + last_name,
      image_url: image_url
    }
    await connectDB()
    await user.findByIdAndUpdate(id,userdata)

        }

)

// inngest function to delete user from database
export const syncUserDeletion = inngest.createFunction(
  {
    id: 'delete-user-with-clerk'
  },
  {
    event: 'clerk/user.deleted'
  },
  async ({ event }) => {
    const { id } = event.data

    await connectDB()
    await user.findByIdAndDelete(id)
  }
)