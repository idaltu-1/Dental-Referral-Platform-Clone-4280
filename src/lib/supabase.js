import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

export default supabase

// Database service for handling CRUD operations
export class DatabaseService {
  
  // Profile operations
  static async saveProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          ...profileData,
          updated_at: new Date().toISOString()
        })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error saving profile:', error)
      throw error
    }
  }

  static async getProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error && error.code !== 'PGRST116') throw error
      return data
    } catch (error) {
      console.error('Error fetching profile:', error)
      throw error
    }
  }

  // Referral operations
  static async saveReferral(referralData) {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .insert({
          ...referralData,
          id: `ref_${Date.now()}`,
          created_at: new Date().toISOString(),
          status: 'Pending'
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error saving referral:', error)
      throw error
    }
  }

  static async getReferrals(userId, filters = {}) {
    try {
      let query = supabase
        .from('referrals')
        .select('*')
        .or(`referring_doctor_id.eq.${userId},receiving_doctor_id.eq.${userId}`)

      // Apply filters
      if (filters.status && filters.status !== 'All') {
        query = query.eq('status', filters.status)
      }
      if (filters.specialty && filters.specialty !== 'All') {
        query = query.eq('specialty', filters.specialty)
      }
      if (filters.priority && filters.priority !== 'All') {
        query = query.eq('priority', filters.priority)
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching referrals:', error)
      throw error
    }
  }

  static async updateReferral(referralId, updates) {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', referralId)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating referral:', error)
      throw error
    }
  }

  static async deleteReferral(referralId) {
    try {
      const { error } = await supabase
        .from('referrals')
        .delete()
        .eq('id', referralId)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting referral:', error)
      throw error
    }
  }

  // User operations
  static async getUsers(filters = {}) {
    try {
      let query = supabase.from('users').select('*')

      if (filters.role && filters.role !== 'All') {
        query = query.eq('role', filters.role)
      }
      if (filters.status && filters.status !== 'All') {
        query = query.eq('status', filters.status)
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  static async saveUser(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({
          ...userData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error saving user:', error)
      throw error
    }
  }

  // Network operations
  static async getNetworkProfessionals(filters = {}) {
    try {
      let query = supabase.from('professionals').select('*')

      if (filters.specialty && filters.specialty !== 'All') {
        query = query.eq('specialty', filters.specialty)
      }
      if (filters.location && filters.location !== 'All') {
        query = query.ilike('location', `%${filters.location}%`)
      }

      const { data, error } = await query.order('rating', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching professionals:', error)
      throw error
    }
  }

  static async connectProfessional(userId, professionalId) {
    try {
      const { data, error } = await supabase
        .from('connections')
        .insert({
          user_id: userId,
          professional_id: professionalId,
          status: 'pending',
          created_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error connecting with professional:', error)
      throw error
    }
  }
}