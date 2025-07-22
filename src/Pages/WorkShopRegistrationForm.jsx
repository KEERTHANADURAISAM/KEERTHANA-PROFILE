import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';


const SignaturePad = ({ onSignatureChange, signature }) => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedPhase = searchParams.get("phase");

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLastPos({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastPos({ x, y });
    onSignatureChange(canvas.toDataURL());
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onSignatureChange('');
  };

  return (
    <div className="space-y-2">
      <div className="border-2 border-blue-500 rounded-lg bg-white">
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          className="w-full h-32 cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
      <button
        type="button"
        onClick={clearSignature}
        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
      >
        Clear Signature
      </button>
    </div>
  );
};

const TradingRegistrationForm = () => {
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
    occupation: '',
    tradingExperience: '',
    workshopDate: '',
    emergencyContact: '',
    emergencyPhone: '',
    aadharNumber: '',
    panNumber: '',
    aadharFile: null,
    panFile: null,
    signature: '',
    agreeTerms: false,
    agreeMarketing: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSignatureChange = (signatureData) => {
    setFormData(prev => ({ ...prev, signature: signatureData }));
    if (errors.signature) {
      setErrors(prev => ({ ...prev, signature: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.workshopDate) newErrors.workshopDate = 'Workshop date is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
    if (!formData.aadharNumber.trim()) newErrors.aadharNumber = 'Aadhar number is required';
    else if (!/^\d{12}$/.test(formData.aadharNumber.replace(/\s/g, ''))) newErrors.aadharNumber = 'Aadhar number must be 12 digits';
    if (!formData.panNumber.trim()) newErrors.panNumber = 'PAN number is required';
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) newErrors.panNumber = 'Invalid PAN format';
    if (!formData.aadharFile) newErrors.aadharFile = 'Aadhar card upload is required';
    if (!formData.panFile) newErrors.panFile = 'PAN card upload is required';
    if (!formData.signature) newErrors.signature = 'Digital signature is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
    console.log('Form submitted:', formData);
  };

  

  return (
  
      <div className="relative z-10 min-h-screen py-8 px-4 mt-18">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">
            Trading Professor Course 
            </h1>
            <p className="text-blue-300 text-lg">Registration Form</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Form */}
          <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20">
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
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your first name"
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
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your last name"
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
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+91 9876543210"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
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
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your complete address"
                />
                {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="City"
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
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="State"
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
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Pincode"
                  />
                  {errors.pincode && <p className="text-red-400 text-sm mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Identity Documents (KYC)
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Aadhar Card Section */}
                <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">ID</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">Aadhar Card</h4>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Aadhar Number *</label>
                    <input
                      type="text"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="XXXX XXXX XXXX"
                      maxLength={14}
                    />
                    {errors.aadharNumber && <p className="text-red-400 text-sm mt-1">{errors.aadharNumber}</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Upload Aadhar Card *</label>
                    <div className="relative">
                      <input
                        type="file"
                        name="aadharFile"
                        onChange={handleInputChange}
                        accept="image/*,application/pdf"
                        className="hidden"
                        id="aadhar-upload"
                      />
                      <label
                        htmlFor="aadhar-upload"
                        className="w-full bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg px-4 py-6 text-center cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center"
                      >
                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-gray-300">
                          {formData.aadharFile ? formData.aadharFile.name : 'Click to upload Aadhar'}
                        </span>
                        <span className="text-gray-500 text-sm mt-1">PNG, JPG or PDF (max 5MB)</span>
                      </label>
                    </div>
                    {errors.aadharFile && <p className="text-red-400 text-sm mt-1">{errors.aadharFile}</p>}
                  </div>
                </div>

                {/* PAN Card Section */}
                <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">PAN</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">PAN Card</h4>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">PAN Number *</label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase"
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                    {errors.panNumber && <p className="text-red-400 text-sm mt-1">{errors.panNumber}</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Upload PAN Card *</label>
                    <div className="relative">
                      <input
                        type="file"
                        name="panFile"
                        onChange={handleInputChange}
                        accept="image/*,application/pdf"
                        className="hidden"
                        id="pan-upload"
                      />
                      <label
                        htmlFor="pan-upload"
                        className="w-full bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg px-4 py-6 text-center cursor-pointer hover:border-purple-500 transition-colors flex flex-col items-center"
                      >
                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-gray-300">
                          {formData.panFile ? formData.panFile.name : 'Click to upload PAN'}
                        </span>
                        <span className="text-gray-500 text-sm mt-1">PNG, JPG or PDF (max 5MB)</span>
                      </label>
                    </div>
                    {errors.panFile && <p className="text-red-400 text-sm mt-1">{errors.panFile}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-blue-200 text-sm">
                    <p className="font-semibold mb-1">Document Requirements:</p>
                    <ul className="space-y-1 text-blue-300">
                      <li>• Both documents are mandatory for trading account verification</li>
                      <li>• Ensure documents are clear and readable</li>
                      <li>• Accepted formats: JPG, PNG, PDF (Maximum 5MB each)</li>
                      <li>• Documents will be securely stored and used only for verification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Professional Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your current occupation"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Trading Experience</label>
                  <select
                    name="tradingExperience"
                    value={formData.tradingExperience}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                    <option value="professional">Professional Trader</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Workshop Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Workshop Information
              </h3>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Preferred Workshop Date *</label>
                <select
                  name="workshopDate"
                  value={formData.workshopDate}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select workshop date</option>
                  <option value="2025-08-15">August 15, 2025 - Weekend Batch</option>
                  <option value="2025-08-22">August 22, 2025 - Weekend Batch</option>
                  <option value="2025-08-29">August 29, 2025 - Weekend Batch</option>
                  <option value="2025-09-05">September 5, 2025 - Weekday Batch</option>
                </select>
                {errors.workshopDate && <p className="text-red-400 text-sm mt-1">{errors.workshopDate}</p>}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Emergency Contact
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Contact Name *</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Emergency contact name"
                  />
                  {errors.emergencyContact && <p className="text-red-400 text-sm mt-1">{errors.emergencyContact}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Contact Phone *</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Emergency contact phone"
                  />
                  {errors.emergencyPhone && <p className="text-red-400 text-sm mt-1">{errors.emergencyPhone}</p>}
                </div>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Digital Signature *
              </h3>
              <p className="text-gray-400 mb-4">Please sign below to complete your registration:</p>
              <SignaturePad
                signature={formData.signature}
                onSignatureChange={handleSignatureChange}
              />
              {errors.signature && <p className="text-red-400 text-sm mt-1">{errors.signature}</p>}
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Complete Registration
              </button>
            </div>
            </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              © 2025 Trading Workshop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    
  );
};

export default TradingRegistrationForm;