export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
import { serve } from "inngest/next";
import { inngest, syncUserDeletion, syncuserUpdation,syncUserCreation} from "@/config/inngest.js";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncuserUpdation,
    syncUserDeletion,
    syncUserCreation
  ],
});