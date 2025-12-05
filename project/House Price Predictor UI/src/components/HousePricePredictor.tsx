import { useState, useEffect } from 'react';
import { Home, Sparkles, TrendingUp, Star, Zap, Building2, Calendar, Gauge, Maximize2, Layers, ArrowRight, Check, Info, Loader2, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface FormData {
  OverallQual: string;
  GrLivArea: string;
  GarageCars: string;
  YearBuilt: string;
  TotalBsmtSF: string;
}

interface FloatingInputProps {
  id: keyof FormData;
  label: string;
  placeholder: string;
  hint: string;
  icon: React.ReactNode;
  unit?: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

// Floating shapes background component
function FloatingShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl"
      />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

// Particle burst effect
function ParticleBurst() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5],
            opacity: [1, 0],
            x: [0, Math.cos((i * 30 * Math.PI) / 180) * 100],
            y: [0, Math.sin((i * 30 * Math.PI) / 180) * 100],
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
        />
      ))}
    </div>
  );
}

function FloatingInput({ 
  id, 
  label, 
  placeholder, 
  hint, 
  icon,
  unit, 
  value, 
  onChange,
  min,
  max 
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const hasValue = value !== '';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative group"
    >
      <div className="relative">
        {/* Glow effect on focus */}
        {isFocused && (
          <motion.div
            layoutId={`glow-${id}`}
            className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-300">
          {/* Icon */}
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
            isFocused || hasValue ? 'text-blue-400' : 'text-white/40'
          }`}>
            {icon}
          </div>
          
          <input
            type="number"
            id={id}
            name={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=" "
            min={min}
            max={max}
            className="peer w-full pl-14 pr-14 pt-7 pb-3 bg-transparent focus:outline-none transition-all duration-200 text-white placeholder-transparent"
          />
          
          <label
            htmlFor={id}
            className={`absolute left-14 transition-all duration-200 pointer-events-none select-none ${
              isFocused || hasValue
                ? 'top-2 text-xs text-blue-300'
                : 'top-1/2 -translate-y-1/2 text-white/60'
            }`}
          >
            {label}
            {unit && (isFocused || hasValue) && (
              <span className="text-white/40 ml-1.5 text-xs">({unit})</span>
            )}
          </label>
          
          {/* Success checkmark */}
          {hasValue && value && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center"
            >
              <Check className="w-3 h-3 text-white" />
            </motion.div>
          )}
          
          {/* Info tooltip */}
          <div 
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-help z-10"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <Info className="w-5 h-5 text-white/40 hover:text-white/80 transition-colors" />
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 z-50 w-80 p-4 bg-slate-900/95 backdrop-blur-xl text-white text-sm rounded-xl shadow-2xl border border-white/10"
                >
                  <div className="absolute -top-2 right-4 w-4 h-4 bg-slate-900 transform rotate-45 border-l border-t border-white/10" />
                  <p className="leading-relaxed">{hint}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HousePricePredictor() {
  const [formData, setFormData] = useState<FormData>({
    OverallQual: '',
    GrLivArea: '',
    GarageCars: '',
    YearBuilt: '',
    TotalBsmtSF: ''
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<{ lower: number, upper: number }>({ lower: 0, upper: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showParticles, setShowParticles] = useState(false);

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handlePredict = async () => {
    // Validate inputs
    const missingFields = Object.entries(formData).filter(([_, value]) => !value);
    if (missingFields.length > 0) {
      setError('Please complete all fields to get your prediction');
      return;
    }

    // Validate ranges
    const qual = Number(formData.OverallQual);
    const year = Number(formData.YearBuilt);
    const cars = Number(formData.GarageCars);
    const grLivArea = Number(formData.GrLivArea);
    const bsmtSF = Number(formData.TotalBsmtSF);

    if (qual < 1 || qual > 10) {
      setError('Overall Quality must be between 1 and 10');
      return;
    }

    if (year < 1800 || year > new Date().getFullYear()) {
      setError('Please enter a valid construction year');
      return;
    }

    if (cars < 0 || cars > 5) {
      setError('Garage capacity must be between 0 and 5 cars');
      return;
    }

    if (grLivArea < 0 || grLivArea > 10000) {
      setError('Please enter a valid living area');
      return;
    }

    if (bsmtSF < 0 || bsmtSF > 10000) {
      setError('Please enter a valid basement area');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);
    setShowParticles(false);

    try {
      // POST request to /predict endpoint
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          OverallQual: qual,
          GrLivArea: grLivArea,
          GarageCars: cars,
          YearBuilt: year,
          TotalBsmtSF: bsmtSF
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const predictedPrice = data.predicted_price || data.prediction;
      setPrediction(predictedPrice);
      
      // Calculate or extract prediction interval
      // If backend provides interval, use it; otherwise calculate ±15% range
      const lowerBound = data.lower_bound || data.interval_lower || predictedPrice * 0.85;
      const upperBound = data.upper_bound || data.interval_upper || predictedPrice * 1.15;
      
      setPriceRange({
        lower: lowerBound,
        upper: upperBound
      });
      
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1500);
    } catch (err) {
      console.error('Prediction error:', err);
      
      // Show actual error to user
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Unable to connect to the prediction service. Please ensure your backend is running on http://localhost:5000');
      } else if (err instanceof Error) {
        setError(`Prediction failed: ${err.message}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      id: 'OverallQual' as keyof FormData,
      label: 'Overall Quality',
      placeholder: '7',
      hint: 'Rate the overall material and finish quality on a scale from 1 to 10. Consider workmanship, materials, and finishing touches.',
      unit: '1-10',
      icon: <Star className="w-5 h-5" />,
      min: '1',
      max: '10'
    },
    {
      id: 'GrLivArea' as keyof FormData,
      label: 'Ground Living Area',
      placeholder: '1500',
      hint: 'Total living area in square feet above ground level. Includes all finished living spaces but excludes basement areas.',
      unit: 'sq ft',
      icon: <Maximize2 className="w-5 h-5" />,
      min: '0',
      max: '10000'
    },
    {
      id: 'GarageCars' as keyof FormData,
      label: 'Garage Capacity',
      placeholder: '2',
      hint: 'Number of cars that can be parked in the garage. Enter 0 for no garage, up to 5 for large multi-car garages.',
      unit: 'cars',
      icon: <Gauge className="w-5 h-5" />,
      min: '0',
      max: '5'
    },
    {
      id: 'YearBuilt' as keyof FormData,
      label: 'Year Built',
      placeholder: '2005',
      hint: 'The original year the house was constructed. Enter the year of initial construction, not renovation dates.',
      unit: 'year',
      icon: <Calendar className="w-5 h-5" />,
      min: '1800',
      max: new Date().getFullYear().toString()
    },
    {
      id: 'TotalBsmtSF' as keyof FormData,
      label: 'Total Basement Area',
      placeholder: '1000',
      hint: 'Total basement square footage, including both finished and unfinished areas. Enter 0 if there is no basement.',
      unit: 'sq ft',
      icon: <Layers className="w-5 h-5" />,
      min: '0',
      max: '10000'
    }
  ];

  const formProgress = Object.values(formData).filter(v => v !== '').length;
  const progressPercentage = (formProgress / 5) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <FloatingShapes />
      
      {/* Mesh gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header / Hero */}
        <header className="pt-16 pb-12 px-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Floating logo */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center justify-center mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-50" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Home className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Title with gradient */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-7xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
              style={{ fontWeight: 700 }}
            >
              House Price Predictor
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/70 max-w-2xl mx-auto mb-8"
            >
              Harness the power of AI to predict your property&apos;s market value with stunning accuracy
            </motion.p>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center gap-6 text-white/60"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">AI-Powered</span>
              </div>
              <div className="w-1 h-1 bg-white/40 rounded-full" />
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Instant Results</span>
              </div>
              <div className="w-1 h-1 bg-white/40 rounded-full" />
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">Market Data</span>
              </div>
            </motion.div>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 pb-20">
          {/* Progress indicator */}
          <AnimatePresence>
            {formProgress > 0 && formProgress < 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/70 text-sm">Progress</span>
                    <span className="text-white text-sm">{formProgress} of 5 complete</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative overflow-hidden"
                    >
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glassmorphic Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mb-12"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20" />
            
            {/* Card */}
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              {/* Header gradient */}
              <div className="bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-xl px-10 py-8 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl mb-1">Property Details</h3>
                    <p className="text-white/60 text-sm">Enter accurate information for best results</p>
                  </div>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handlePredict(); }} className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {inputFields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <FloatingInput
                        id={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        hint={field.hint}
                        icon={field.icon}
                        unit={field.unit}
                        value={formData[field.id]}
                        onChange={handleInputChange(field.id)}
                        min={field.min}
                        max={field.max}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl text-red-200 flex items-start gap-3">
                        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{error}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Predict Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="relative w-full group"
                >
                  {/* Button glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Button */}
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-6 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden">
                    {/* Shimmer effect */}
                    <motion.div
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    
                    <span className="relative z-10 flex items-center gap-3 text-lg">
                      {loading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Analyzing Property...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-6 h-6" />
                          Predict House Price
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </div>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Result Display with Particle Effect */}
          <AnimatePresence>
            {prediction !== null && (
              <motion.div
                id="prediction-result"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
                className="relative"
              >
                {/* Particle burst */}
                {showParticles && <ParticleBurst />}
                
                {/* Outer glow */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.98, 1.02, 0.98],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-2xl"
                />
                
                {/* Card */}
                <div className="relative bg-gradient-to-br from-emerald-900/40 via-teal-900/40 to-cyan-900/40 backdrop-blur-2xl border-2 border-emerald-400/50 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Animated gradient overlay */}
                  <motion.div
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                      backgroundSize: '200% 100%',
                    }}
                  />
                  
                  <div className="relative p-12">
                    {/* Success icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                      className="flex justify-center mb-8"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-xl opacity-60" />
                        <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
                          <Check className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Price */}
                    <div className="text-center">
                      <p className="text-white/70 text-lg mb-4">Estimated Property Value</p>
                      
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                      >
                        <div className="relative inline-block">
                          {/* Number glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 blur-2xl opacity-40" />
                          
                          <p className="relative text-7xl md:text-8xl bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent mb-8" style={{ fontWeight: 800 }}>
                            ${prediction.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                      </motion.div>
                      
                      {/* Info box */}
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                      >
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <p className="text-white/80 text-sm leading-relaxed text-left">
                            This AI-generated prediction is based on the property features you provided and historical market data. 
                            Actual prices may vary based on location, market conditions, and unique property characteristics.
                          </p>
                        </div>
                      </motion.div>

                      {/* Price Range Chart */}
                      {priceRange && (
                        <motion.div
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.9 }}
                          className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                        >
                          <div className="flex items-center gap-2 mb-6">
                            <BarChart3 className="w-5 h-5 text-emerald-400" />
                            <h4 className="text-white">Price Range Estimate</h4>
                          </div>
                          
                          <div className="h-64 mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={[
                                  { name: 'Lower', value: priceRange.lower, display: priceRange.lower },
                                  { name: 'Predicted', value: prediction, display: prediction },
                                  { name: 'Upper', value: priceRange.upper, display: priceRange.upper }
                                ]}
                                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                              >
                                <defs>
                                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.2}/>
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis 
                                  dataKey="name" 
                                  stroke="rgba(255,255,255,0.5)"
                                  style={{ fontSize: '12px' }}
                                />
                                <YAxis 
                                  stroke="rgba(255,255,255,0.5)"
                                  style={{ fontSize: '12px' }}
                                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    backdropFilter: 'blur(12px)',
                                    color: '#fff',
                                    padding: '12px'
                                  }}
                                  formatter={(value: number) => [`$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`, 'Price']}
                                />
                                <ReferenceLine 
                                  y={prediction || 0} 
                                  stroke="#10b981" 
                                  strokeDasharray="3 3"
                                  strokeWidth={2}
                                  label={{ 
                                    value: 'Predicted Price', 
                                    fill: '#10b981', 
                                    fontSize: 12,
                                    position: 'insideTopRight'
                                  }}
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke="#10b981" 
                                  strokeWidth={2}
                                  fillOpacity={1} 
                                  fill="url(#colorValue)" 
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                              <p className="text-xs text-white/60 mb-1">Lower Estimate</p>
                              <p className="text-white">
                                ${priceRange.lower.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                              </p>
                            </div>
                            <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                              <p className="text-xs text-emerald-300 mb-1">Predicted Price</p>
                              <p className="text-emerald-200">
                                ${prediction?.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                              </p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                              <p className="text-xs text-white/60 mb-1">Upper Estimate</p>
                              <p className="text-white">
                                ${priceRange.upper.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-white/50 text-center mt-4">
                            The price range represents a 95% confidence interval based on model predictions
                          </p>
                        </motion.div>
                      )}

                      {/* Success indicator */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="mt-6 flex items-center justify-center gap-2 text-emerald-300 text-sm"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Check className="w-4 h-4" />
                        </motion.div>
                        <span>Prediction Complete</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}