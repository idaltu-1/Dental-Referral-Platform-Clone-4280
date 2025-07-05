import { createClient } from '@supabase/supabase-js'

// Supabase configuration with correct credentials
const SUPABASE_URL = 'https://fxtdknmppvooqjbacprf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dGRrbm1wcHZvb3FqYmFjcHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2ODU0MzIsImV4cCI6MjA0OTI2MTQzMn0.33coEv0hhKIzLjPyVujGBAMs6X3EtZzZTvNNINA8EuY'

if (SUPABASE_URL === 'https://your-project.supabase.co' || SUPABASE_ANON_KEY === 'your-anon-key') {
  throw new Error('Missing Supabase variables');
}

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

export default supabase

// Enhanced Database service for handling CRUD operations
export class DatabaseService {
  // Profile operations
  static async saveProfile(userId, profileData) {
    try {
      console.log('Saving profile for user:', userId, profileData);
      
      // First check if profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles_dental_2024')
        .select('id')
        .eq('id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing profile:', checkError);
      }

      const profilePayload = {
        id: userId,
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        practice: profileData.practice,
        location: profileData.location,
        specialty: profileData.specialty,
        license_number: profileData.licenseNumber,
        experience: profileData.experience,
        education: profileData.education,
        bio: profileData.bio,
        website: profileData.website,
        avatar: profileData.avatar,
        certifications: JSON.stringify(profileData.certifications || []),
        languages: JSON.stringify(profileData.languages || []),
        insurance_accepted: JSON.stringify(profileData.insuranceAccepted || []),
        updated_at: new Date().toISOString()
      };

      let result;
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('profiles_dental_2024')
          .update(profilePayload)
          .eq('id', userId)
          .select();
      } else {
        // Insert new profile
        result = await supabase
          .from('profiles_dental_2024')
          .insert({
            ...profilePayload,
            created_at: new Date().toISOString()
          })
          .select();
      }

      if (result.error) {
        console.error('Supabase error:', result.error);
        throw new Error(`Database error: ${result.error.message}`);
      }

      console.log('Profile saved successfully:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  }

  static async getProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles_dental_2024')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        throw error;
      }

      if (!data) {
        return null;
      }

      // Parse JSON fields
      return {
        ...data,
        licenseNumber: data.license_number,
        insuranceAccepted: data.insurance_accepted ? JSON.parse(data.insurance_accepted) : [],
        certifications: data.certifications ? JSON.parse(data.certifications) : [],
        languages: data.languages ? JSON.parse(data.languages) : []
      };
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Return null instead of throwing to allow graceful fallback
      return null;
    }
  }

  // Referral operations
  static async saveReferral(referralData) {
    try {
      const { data, error } = await supabase
        .from('referrals_dental_2024')
        .insert({
          id: `ref_${Date.now()}`,
          patient_name: referralData.patientName,
          patient_email: referralData.patientEmail,
          patient_phone: referralData.patientPhone,
          patient_address: referralData.patientAddress,
          specialty: referralData.specialty,
          receiving_doctor: referralData.receivingDoctor,
          referring_doctor_id: referralData.referring_doctor_id,
          referring_doctor: referralData.referring_doctor,
          priority: referralData.priority || 'Medium',
          urgency: referralData.urgency || 'Routine',
          notes: referralData.notes,
          reason_for_referral: referralData.reasonForReferral,
          appointment_date: referralData.appointmentDate,
          insurance_provider: referralData.insuranceProvider,
          status: 'Pending',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      
      // Transform back to frontend format
      return {
        ...data,
        patientName: data.patient_name,
        patientEmail: data.patient_email,
        patientPhone: data.patient_phone,
        patientAddress: data.patient_address,
        receivingDoctor: data.receiving_doctor,
        referringDoctor: data.referring_doctor,
        reasonForReferral: data.reason_for_referral,
        appointmentDate: data.appointment_date,
        insuranceProvider: data.insurance_provider,
        dateCreated: data.created_at
      };
    } catch (error) {
      console.error('Error saving referral:', error);
      throw error;
    }
  }

  static async getReferrals(userId, filters = {}) {
    try {
      let query = supabase
        .from('referrals_dental_2024')
        .select('*')
        .or(`referring_doctor_id.eq.${userId},receiving_doctor_id.eq.${userId}`);

      // Apply filters
      if (filters.status && filters.status !== 'All') {
        query = query.eq('status', filters.status);
      }
      if (filters.specialty && filters.specialty !== 'All') {
        query = query.eq('specialty', filters.specialty);
      }
      if (filters.priority && filters.priority !== 'All') {
        query = query.eq('priority', filters.priority);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      // Transform to frontend format
      return (data || []).map(item => ({
        ...item,
        patientName: item.patient_name,
        patientEmail: item.patient_email,
        patientPhone: item.patient_phone,
        patientAddress: item.patient_address,
        receivingDoctor: item.receiving_doctor,
        referringDoctor: item.referring_doctor,
        reasonForReferral: item.reason_for_referral,
        appointmentDate: item.appointment_date,
        insuranceProvider: item.insurance_provider,
        dateCreated: item.created_at
      }));
    } catch (error) {
      console.error('Error fetching referrals:', error);
      return [];
    }
  }

  static async updateReferral(referralId, updates) {
    try {
      const updatePayload = {};
      
      // Map frontend fields to database fields
      if (updates.patientName) updatePayload.patient_name = updates.patientName;
      if (updates.patientEmail) updatePayload.patient_email = updates.patientEmail;
      if (updates.patientPhone) updatePayload.patient_phone = updates.patientPhone;
      if (updates.patientAddress) updatePayload.patient_address = updates.patientAddress;
      if (updates.specialty) updatePayload.specialty = updates.specialty;
      if (updates.receivingDoctor) updatePayload.receiving_doctor = updates.receivingDoctor;
      if (updates.priority) updatePayload.priority = updates.priority;
      if (updates.urgency) updatePayload.urgency = updates.urgency;
      if (updates.notes) updatePayload.notes = updates.notes;
      if (updates.reasonForReferral) updatePayload.reason_for_referral = updates.reasonForReferral;
      if (updates.appointmentDate) updatePayload.appointment_date = updates.appointmentDate;
      if (updates.insuranceProvider) updatePayload.insurance_provider = updates.insuranceProvider;
      if (updates.status) updatePayload.status = updates.status;
      
      updatePayload.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('referrals_dental_2024')
        .update(updatePayload)
        .eq('id', referralId)
        .select()
        .single();

      if (error) throw error;
      
      // Transform back to frontend format
      return {
        ...data,
        patientName: data.patient_name,
        patientEmail: data.patient_email,
        patientPhone: data.patient_phone,
        patientAddress: data.patient_address,
        receivingDoctor: data.receiving_doctor,
        referringDoctor: data.referring_doctor,
        reasonForReferral: data.reason_for_referral,
        appointmentDate: data.appointment_date,
        insuranceProvider: data.insurance_provider,
        dateCreated: data.created_at
      };
    } catch (error) {
      console.error('Error updating referral:', error);
      throw error;
    }
  }

  static async deleteReferral(referralId) {
    try {
      const { error } = await supabase
        .from('referrals_dental_2024')
        .delete()
        .eq('id', referralId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting referral:', error);
      throw error;
    }
  }

  // User operations
  static async getUsers(filters = {}) {
    try {
      let query = supabase.from('users_dental_2024').select('*');

      if (filters.role && filters.role !== 'All') {
        query = query.eq('role', filters.role);
      }
      if (filters.status && filters.status !== 'All') {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  static async saveUser(userData) {
    try {
      const { data, error } = await supabase
        .from('users_dental_2024')
        .upsert({
          ...userData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  // Network operations
  static async getNetworkProfessionals(filters = {}) {
    try {
      let query = supabase.from('professionals_dental_2024').select('*');

      if (filters.specialty && filters.specialty !== 'All') {
        query = query.eq('specialty', filters.specialty);
      }
      if (filters.location && filters.location !== 'All') {
        query = query.ilike('location', `%${filters.location}%`);
      }

      const { data, error } = await query.order('rating', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching professionals:', error);
      return [];
    }
  }

  static async connectProfessional(userId, professionalId) {
    try {
      const { data, error } = await supabase
        .from('connections_dental_2024')
        .insert({
          user_id: userId,
          professional_id: professionalId,
          status: 'pending',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error connecting with professional:', error);
      throw error;
    }
  }
}