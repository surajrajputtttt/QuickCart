import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "quickcart-next" });

export const SyncUserCreation = inngest.createFunction(
  { id: 'sync-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    const connectDB = (await import("./db.js")).default;
    const user = (await import("../models/users.js")).default;
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

export const syncuserUpdation = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    const connectDB = (await import("./db.js")).default;
    const user = (await import("../models/users.js")).default;
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + ' ' + last_name,
      image_url: image_url
    }
    await connectDB()
    await user.findByIdAndUpdate(id, userData)
  }
)

export const syncUserDeletion = inngest.createFunction(
  { id: 'delete-user-with-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    const connectDB = (await import("./db.js")).default;
    const user = (await import("../models/users.js")).default;
    const { id } = event.data
    await connectDB()
    await user.findByIdAndDelete(id)
  }
)