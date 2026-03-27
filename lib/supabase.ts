import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function saveAuditUrl(url: string) {
  const { data, error } = await supabase
    .from('audits')
    .insert([{ url, created_at: new Date().toISOString(), status: 'pending' }])
    .select()
    .single()
  if (error) throw error
  return data
}
