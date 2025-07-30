import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedGridBackground';
import { useLocation, useSearchParams } from 'react-router-dom';

const TradingRegistrationForm = () => {


const location = useLocation();
const params = new URLSearchParams(location.search);
const name = params.get('courseName');
// const amount = params.get('amount');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    aadharNumber: '',
    agreeTerms: false,
    agreeMarketing: false,
    courseName:'',
    // amount:''
  });
useEffect(() => {
  setFormData((prev) => ({
    ...prev,
    courseName: name || '',
    // amount: amount || '', // ✅ make sure this is set
  }));
}, [name]);
  const [files, setFiles] = useState({
    aadharFile: null,
    signatureFile: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');


 

  // Enhanced Validation Functions (from your code)
// Replace your existing validateAadhaar function with this enhanced version
const validators = {
  validateAadhaar: function(aadhaarNumber) {
    // Remove all spaces and non-digit characters
    const cleanNumber = aadhaarNumber.replace(/\D/g, '');
    
    console.log('🔍 Validating Aadhaar input:', aadhaarNumber);
    console.log('🔢 Clean digits:', cleanNumber);
    
    // Check if exactly 12 digits
    if (!/^\d{12}$/.test(cleanNumber)) {
      console.log('❌ Aadhaar validation failed: Not exactly 12 digits (length:', cleanNumber.length, ')');
      return false;
    }
    
    // Check if first digit is between 2-9 (Aadhaar doesn't start with 0 or 1)
    if (!/^[2-9]/.test(cleanNumber)) {
      console.log('❌ Aadhaar validation failed: First digit must be 2-9, got:', cleanNumber[0]);
      return false;
    }
    
    // Check for invalid patterns
    // All same digits
    if (/^(\d)\1{11}$/.test(cleanNumber)) {
      console.log('❌ Aadhaar validation failed: All same digits');
      return false;
    }
    
    // Sequential numbers
    if (cleanNumber === '123456789012' || cleanNumber === '987654321098') {
      console.log('❌ Aadhaar validation failed: Sequential pattern');
      return false;
    }
    
    console.log('✅ Aadhaar validation passed for:', cleanNumber);
    return true;
  },

  // Keep your other validators as they are
  validateAge: function(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18 && age <= 100;
  },

  validateName: function(name) {
    return /^[a-zA-Z\s]+$/.test(name);
  },

  validatePhone: function(phone) {
    return /^[6789]\d{9}$/.test(phone);
  },

  validatePincode: function(pincode) {
    return /^[1-9]\d{5}$/.test(pincode);
  }
};

// Also update your handleInputChange function for better Aadhar formatting
const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  let newValue = type === 'checkbox' ? checked : value;
  
  // Enhanced Aadhaar number formatting with better handling
  if (name === 'aadharNumber') {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Limit to 12 digits
    const limitedDigits = digitsOnly.substring(0, 12);
    
    // Format with spaces: XXXX XXXX XXXX
    newValue = limitedDigits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    console.log('📝 Aadhar input formatting:', {
      original: value,
      digitsOnly: digitsOnly,
      formatted: newValue,
      length: limitedDigits.length
    });
  }
  
  setFormData(prev => ({
    ...prev,
    [name]: newValue
  }));
  
  // Clear error when user starts typing
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: '' }));
  }

  console.log(`Field Changed: ${name} = `, newValue);
};

  // Console log form values when they change (from your code)
useEffect(() => {
  console.log('=== FORM DATA VALUES ===');
  console.log('Personal Info:', {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    dateOfBirth: formData.dateOfBirth
  });
  console.log('Address Info:', {
    address: formData.address,
    city: formData.city,
    state: formData.state,
    pincode: formData.pincode
  });
  console.log('Documents:', {
    aadharNumber: formData.aadharNumber,
    aadharFile: files.aadharFile?.name || 'Not uploaded',
    signatureFile: files.signatureFile?.name || 'Not uploaded',
  });
  console.log('Agreements:', {
    agreeTerms: formData.agreeTerms,
    agreeMarketing: formData.agreeMarketing
  });
  console.log('Course Info:', {
    courseName: formData.courseName,
    // amount: formData.amount
  });
  console.log('========================');
}, [formData, files]);


    // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const file = selectedFiles[0];

    if (file) {
      // Validate file size and type
      if (name === 'aadharFile') {
        if (file.size > 5 * 1024 * 1024) {
          setErrors(prev => ({
            ...prev,
            aadharFile: 'Aadhaar file size cannot exceed 5MB'
          }));
          return;
        }
        if (!['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(file.type)) {
          setErrors(prev => ({
            ...prev,
            aadharFile: 'Aadhaar file must be JPG, PNG, or PDF'
          }));
          return;
        }
      }

      if (name === 'signatureFile') {
        if (file.size > 2 * 1024 * 1024) {
          setErrors(prev => ({
            ...prev,
            signatureFile: 'Signature file size cannot exceed 2MB'
          }));
          return;
        }
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
          setErrors(prev => ({
            ...prev,
            signatureFile: 'Signature file must be JPG or PNG'
          }));
          return;
        }
      }

      setFiles(prev => ({
        ...prev,
        [name]: file
      }));

      // Clear error when file is selected
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  // Enhanced validation based on your code
  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (formData.firstName.length > 50) {
      newErrors.firstName = 'First name cannot exceed 50 characters';
    } else if (!validators.validateName(formData.firstName)) {
      newErrors.firstName = 'First name can only contain letters and spaces';
    }

    // Last Name validation
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (formData.lastName.length > 50) {
      newErrors.lastName = 'Last name cannot exceed 50 characters';
    } else if (!validators.validateName(formData.lastName)) {
      newErrors.lastName = 'Last name can only contain letters and spaces';
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validators.validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits starting with 6, 7, 8, or 9';
    }

    // Date of Birth validation
    if (!formData?.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!validators.validateAge(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'You must be between 18 and 100 years old';
    }

    // Address validation
    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    } else if (formData.address.length > 200) {
      newErrors.address = 'Address cannot exceed 200 characters';
    }

    // City validation
    if (!formData?.city?.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.length < 2) {
      newErrors.city = 'City must be at least 2 characters';
    } else if (formData.city.length > 50) {
      newErrors.city = 'City cannot exceed 50 characters';
    } else if (!validators.validateName(formData.city)) {
      newErrors.city = 'City can only contain letters and spaces';
    }

    // State validation
    if (!formData?.state?.trim()) {
      newErrors.state = 'State is required';
    } else if (formData.state.length < 2) {
      newErrors.state = 'State must be at least 2 characters';
    } else if (formData.state.length > 50) {
      newErrors.state = 'State cannot exceed 50 characters';
    } else if (!validators.validateName(formData.state)) {
      newErrors.state = 'State can only contain letters and spaces';
    }

    // Pincode validation
    if (!formData?.pincode?.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!validators.validatePincode(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits and cannot start with 0';
    }

    // Aadhaar validation
    if (!formData?.aadharNumber?.trim()) {
      newErrors.aadharNumber = 'Aadhaar number is required';
      console.log('❌ Aadhaar validation: Field is empty');
    } else {
      const aadhaarDigits = formData.aadharNumber.replace(/\s/g, '');
      console.log('🔍 Validating Aadhaar:', aadhaarDigits);
      
      if (!validators.validateAadhaar(aadhaarDigits)) {
        newErrors.aadharNumber = 'Please enter a valid 12-digit Aadhaar number';
        console.log('❌ Aadhaar validation failed for:', aadhaarDigits);
      } else {
        console.log('✅ Aadhaar validation passed for:', aadhaarDigits);
      }
    }

    // File validations
    if (!files?.aadharFile) {
      newErrors.aadharFile = 'Aadhaar file is required';
    } else {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(files.aadharFile.type)) {
        newErrors.aadharFile = 'Aadhaar file must be JPG, PNG, or PDF';
      } else if (files.aadharFile.size > 5242880) {
        newErrors.aadharFile = 'Aadhaar file size cannot exceed 5MB';
      }
    }

    if (!files?.signatureFile) {
      newErrors.signatureFile = 'Signature file is required';
    } else {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(files.signatureFile.type)) {
        newErrors.signatureFile = 'Signature file must be JPG or PNG';
      } else if (files.signatureFile.size > 2097152) {
        newErrors.signatureFile = 'Signature file size cannot exceed 2MB';
      }
    }

    // Terms validation
    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'You must accept the terms and conditions';
    }

    return newErrors;
  };

  // Handle form submission with proper FormData
  const handleSubmit = async () => {
  setIsSubmitting(true);
  setSubmitMessage('');
const courseName = formData.courseName;
  const amount = formData.amount;
  const newErrors = validateForm();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setIsSubmitting(false);
    console.log('❌ Form has errors, submission blocked');
    return;
  }

  try {
    // Prepare FormData for text and file fields
    const formDataToSend = new FormData();

    // Append form fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
// ✅ Append courseName and courseAmount if available
if (courseName) {
  formDataToSend.append('courseName', courseName);
}
if (amount) {
  formDataToSend.append('courseAmount', amount); // <-- renamed key here
}
    // Append files
    if (files.aadharFile) {
      formDataToSend.append('aadharFile', files.aadharFile);
    }
    if (files.signatureFile) {
      formDataToSend.append('signatureFile', files.signatureFile);
    }

    console.log('📤 Submitting form data to server...');

    // Send form data to backend
    const response = await fetch('https://tradingserver.onrender.com/api/registration/submit', {
      method: 'POST',
      body: formDataToSend,
    });

    const result = await response.json();

   if (!response.ok) {
    // Server returned error status (e.g. 400, 500)
    const errorMessage = result?.message || 'Submission failed. Please try again.';
    console.error('❌ Server Error:', errorMessage);
    setSubmitMessage('❌ ' + errorMessage);
    setErrors(result.errors || {});
  } else if (result.success) {
    // Success block
    console.log('✅ Server Response:', result);
    setSubmitMessage('✅ Form submitted successfully!');
    setIsSubmitted(true);

    // Reset form fields
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      aadharNumber: '',
      agreeTerms: false,
      agreeMarketing: false,
      courseName:'',
// amount: '',
    });

    setFiles({ aadharFile: null, signatureFile: null });

    // Clear actual file inputs in DOM
    document.querySelectorAll('input[type="file"]').forEach((input) => {
      input.value = '';
    });
  } else {
    // Unexpected valid response but no `success` flag
    console.error('⚠️ Unexpected server response:', result);
    setSubmitMessage('✅ Your registration has been successfully submitted.');
  }
} catch (error) {
  // Handle fetch/network/duplicate errors
  console.error('❌ Catch Error:', error);

  if (error?.message?.includes('E11000')) {
    // Duplicate key (like phone or email)
    setSubmitMessage('❌ This phone number is already registered.');
    setErrors({ phone: 'Phone number already exists.' });
  } else {
    // General catch-all network or unknown error
    setSubmitMessage('❌ Network error. Please try again.');
    setErrors({ general: 'Network error. Please try again.' });
  }
} finally {
  setIsSubmitting(false);
}
  }

  return (
    <AnimatedBackground>
      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">
              Trading Professor Course 
            </h1>
            <p className="text-blue-300 text-lg">Registration Form</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg border ${
              submitMessage.includes('✅') 
                ? 'bg-green-900/20 border-green-500/30 text-green-400' 
                : 'bg-red-900/20 border-red-500/30 text-red-400'
            }`}>
              {submitMessage}
            </div>
          )}

          {/* Form */}
          <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20">
            
            {/* General Error */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                <p className="text-red-400">{errors.general}</p>
              </div>
            )}

            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="Enter your first name"
                    maxLength={50}
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="Enter your last name"
                    maxLength={50}
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.phone ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  <p className="text-gray-400 text-xs mt-1">Must start with 6, 7, 8, or 9</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
                <p className="text-gray-400 text-xs mt-1">Must be between 18-100 years old</p>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Address Information
              </h3>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.address ? 'border-red-500' : 'border-gray-600'}`}
                  placeholder="Enter your complete address (minimum 10 characters)"
                  maxLength={200}
                />
                {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                <p className="text-gray-400 text-xs mt-1">10-200 characters</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.city ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="City"
                    maxLength={50}
                  />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.state ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="State"
                    maxLength={50}
                  />
                  {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.pincode ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="123456"
                    maxLength={6}
                  />
                  {errors.pincode && <p className="text-red-400 text-sm mt-1">{errors.pincode}</p>}
                  <p className="text-gray-400 text-xs mt-1">6 digits, cannot start with 0</p>
                </div>
              </div>
            </div>
                   {/* Course Section */}
       <div className="mb-8">
          <label className="block text-gray-300 mb-2">Course Name *</label>              
<input
  type="text"
  value={formData.courseName}
  disabled
  className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.signatureFile ? 'border-red-500' : 'border-gray-600'}`}
                    />
               {/* <label className="block text-gray-300 mb-2">Course Amount *</label>         
<input
  type="number"
  value={formData.amount}
  disabled
   className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.signatureFile ? 'border-red-500' : 'border-gray-600'}`}
    
/> */}
</div>

            {/* Document Upload Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Identity Documents (KYC)
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Aadhaar Card Section */}
                <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">ID</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">Aadhaar Card</h4>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Aadhaar Number *</label>
                    <input
                      type="text"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.aadharNumber ? 'border-red-500' : 'border-gray-600'}`}
                      placeholder="1234 5678 9012"
                      maxLength={14}
                    />
                    {errors.aadharNumber && <p className="text-red-400 text-sm mt-1">{errors.aadharNumber}</p>}
                    <p className="text-gray-400 text-xs mt-1">12-digit valid Aadhaar number</p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Upload Aadhaar Card *</label>
                    <input
                      type="file"
                      name="aadharFile"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.aadharFile ? 'border-red-500' : 'border-gray-600'}`}
                    />
                    {errors.aadharFile && <p className="text-red-400 text-sm mt-1">{errors.aadharFile}</p>}
                    {files.aadharFile && (
                      <p className="text-green-400 text-sm mt-1">✓ {files.aadharFile.name}</p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">JPG, PNG, or PDF (max 5MB)</p>
                  </div>
                </div>

                {/* Signature Section */}
                <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">✎</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">Signature</h4>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Upload Signature *</label>
                    <p className="text-gray-400 text-sm mb-3">Upload a scanned image of your signature</p>
                    <input
                      type="file"
                      name="signatureFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.signatureFile ? 'border-red-500' : 'border-gray-600'}`}
                    />
                    {errors.signatureFile && <p className="text-red-400 text-sm mt-1">{errors.signatureFile}</p>}
                    {files.signatureFile && (
                      <p className="text-green-400 text-sm mt-1">✓ {files.signatureFile.name}</p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">JPG or PNG only (max 2MB)</p>
                  </div>
                </div>
              </div>
            </div>
     
            {/* Terms and Conditions */}
            <div className="mb-8">
              <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">
                    I agree to the <span className="text-blue-400 hover:underline">Terms and Conditions</span> and 
                    <span className="text-blue-400 hover:underline"> Privacy Policy</span>. I understand that this is a legally binding agreement. *
                  </span>
                </label>
                {errors.agreeTerms && <p className="text-red-400 text-sm">{errors.agreeTerms}</p>}

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">
                    I agree to receive marketing communications about future workshops and trading updates.
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
           <div className="text-center">
  <button
    type="button"
    onClick={handleSubmit}
    disabled={isSubmitting}
    className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {isSubmitting ? 'Submitting...' : 'Complete Registration'}
  </button>
</div>

{/* Success Message */}
{isSubmitted && (
  <div className="mt-8 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
    <div className="text-green-200 text-center">
      <p className="font-semibold">✅ Registration Completed Successfully!</p>
    </div>
  </div>
)}
</div>

        </div>
      </div>
   
    </AnimatedBackground>
  );
};

export default TradingRegistrationForm;