import { API_URL } from '../src/api';
import React, { useState } from 'react';
import { Upload, Image, Calendar, User, CheckCircle, AlertCircle, X } from 'lucide-react';

const EventImagesForm = () => {
  const [formData, setFormData] = useState({
    eventTitle: '',
    imageTitle: '',
    photoUrl: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [images, setImages] = useState([]);

  // Sample data to simulate existing images in the database
  const [existingImages] = useState([
    {
      _id: '1',
      eventTitle: 'CodePhy-3.0',
      imageTitle: 'Amazing glimpse from the event',
      photoUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      createdBy: '68b97822b869f890ad900103',
      createdAt: '2025-09-08T16:57:10.060+00:00',
      updatedAt: '2025-09-08T16:57:10.060+00:00'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.eventTitle.trim()) {
      setMessage({ type: 'error', text: 'Event title is required' });
      return false;
    }
    if (!formData.imageTitle.trim()) {
      setMessage({ type: 'error', text: 'Image title is required' });
      return false;
    }
    if (!formData.photoUrl.trim()) {
      setMessage({ type: 'error', text: 'Photo URL is required' });
      return false;
    }
    
    // Basic URL validation
    try {
      new URL(formData.photoUrl);
    } catch {
      setMessage({ type: 'error', text: 'Please enter a valid URL' });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
  const response = await fetch(`${API_URL}/event/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include", 
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setImages(prev => [...prev, result.images]);
        setMessage({ type: 'success', text: result.message });
        
        // Reset form
        setFormData({
          eventTitle: '',
          imageTitle: '',
          photoUrl: ''
        });
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.message || 'Failed to upload images' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const dismissMessage = () => {
    setMessage({ type: '', text: '' });
  };


  return (
    <div className="mt-16 min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg">
              <Image className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent mb-2">
            Event Image Gallery
          </h1>
          <p className="text-gray-300 text-lg">Add and manage event photos</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl flex items-center justify-between border ${
            message.type === 'success' 
              ? 'bg-green-900/30 border-green-500/50 text-green-300' 
              : 'bg-red-900/30 border-red-500/50 text-red-300'
          }`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
            <button
              onClick={dismissMessage}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden mb-8 shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Upload Event Images
            </h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="eventTitle" className="block text-sm font-medium text-blue-300">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    id="eventTitle"
                    name="eventTitle"
                    value={formData.eventTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., CodePhy-3.0"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="imageTitle" className="block text-sm font-medium text-blue-300">
                    Image Title *
                  </label>
                  <input
                    type="text"
                    id="imageTitle"
                    name="imageTitle"
                    value={formData.imageTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Amazing glimpse from the event"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="photoUrl" className="block text-sm font-medium text-blue-300">
                  Photo URL *
                </label>
                <input
                  type="url"
                  id="photoUrl"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
              
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Add Images</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default EventImagesForm;