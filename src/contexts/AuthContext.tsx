
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        
        if (session?.user) {
          try {
            // Get profile data
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profileError) throw profileError;

            const userData: User = {
              id: session.user.id,
              email: session.user.email || '',
              firstName: profile?.first_name || '',
              lastName: profile?.last_name || '',
              createdAt: profile?.created_at || new Date().toISOString(),
            };
            
            setUser(userData);
          } catch (error) {
            console.error('Profile fetch error:', error);
            // If we can't get the profile, still set the basic user
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              firstName: '',
              lastName: '',
              createdAt: new Date().toISOString(),
            });
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsLoading(false);
          return;
        }

        // Session found, but we'll let the onAuthStateChange handle setting the user
      } catch (error) {
        console.error('Session check error:', error);
        setIsLoading(false);
      }
    };

    checkUser();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // User will be set by the onAuthStateChange listener
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error?.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      // Register the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Update the profile with first name and last name
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: firstName,
            last_name: lastName,
          })
          .eq('id', data.user.id);
        
        if (profileError) {
          console.error('Error updating profile:', profileError);
        }
        
        toast({
          title: "Registration Successful!",
          description: "Your account has been created.",
        });
      }
      
      // User will be set by the onAuthStateChange listener
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error?.message || "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // User will be cleared by the onAuthStateChange listener
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const sendOTP = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });
      
      if (error) throw error;
      
      toast({
        title: "OTP Sent",
        description: `A one-time password has been sent to ${email}`,
      });
    } catch (error: any) {
      console.error('OTP send error:', error);
      toast({
        title: "Failed to Send OTP",
        description: error?.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });
      
      if (error) throw error;
      
      // User will be set by the onAuthStateChange listener
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast({
        title: "Invalid OTP",
        description: error?.message || "The OTP you entered is invalid or expired.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return Promise.reject('User not authenticated');
    
    try {
      // Update auth metadata if email is being changed
      if (userData.email && userData.email !== user.email) {
        const { error: updateAuthError } = await supabase.auth.updateUser({
          email: userData.email,
        });
        
        if (updateAuthError) throw updateAuthError;
      }
      
      // Update profile in the profiles table
      const updateData: any = {};
      if (userData.firstName) updateData.first_name = userData.firstName;
      if (userData.lastName) updateData.last_name = userData.lastName;
      
      if (Object.keys(updateData).length > 0) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', user.id);
        
        if (profileError) throw profileError;
      }
      
      // Update local state
      setUser({ ...user, ...userData });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "Profile Update Failed",
        description: error?.message || "An error occurred while updating your profile.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    sendOTP,
    verifyOTP,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
