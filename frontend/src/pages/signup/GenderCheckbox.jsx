import React from 'react'

const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
    return (
        <div className='space-y-3'>
            <label className='block text-sm font-medium text-gray-300'>
                Gender
            </label>
            <div className='flex gap-4'>
                <div className='flex-1'>
                    <input 
                        type='radio' 
                        id='male'
                        name='gender'
                        checked={selectedGender === 'male'} 
                        onChange={() => onCheckboxChange("male")}
                        className='sr-only'
                    />
                    <label 
                        htmlFor='male'
                        className={`block w-full p-3 text-center rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            selectedGender === 'male' 
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 text-white shadow-lg transform scale-105' 
                                : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/40'
                        }`}
                    >
                        <div className='flex items-center justify-center space-x-2'>
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                            </svg>
                            <span className='font-medium'>Male</span>
                        </div>
                    </label>
                </div>
                
                <div className='flex-1'>
                    <input 
                        type='radio' 
                        id='female'
                        name='gender'
                        checked={selectedGender === 'female'} 
                        onChange={() => onCheckboxChange("female")}
                        className='sr-only'
                    />
                    <label 
                        htmlFor='female'
                        className={`block w-full p-3 text-center rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            selectedGender === 'female' 
                                ? 'bg-gradient-to-r from-pink-500 to-pink-600 border-pink-500 text-white shadow-lg transform scale-105' 
                                : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/40'
                        }`}
                    >
                        <div className='flex items-center justify-center space-x-2'>
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                            </svg>
                            <span className='font-medium'>Female</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default GenderCheckbox