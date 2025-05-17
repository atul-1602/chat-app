import React from 'react'

const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
    return (
        <div>
            <div>
                <label className= {`${selectedGender === 'male' ? "selected": ""}`}>male</label>
                <input type='checkbox' checked={selectedGender==='male'} onChange={()=>onCheckboxChange("male")}/>
            </div>
            <div>
                <label className= {`${selectedGender === 'female' ? "selected": ""}`}>female</label>
                <input type='checkbox'checked={selectedGender==='female'} onChange={()=>onCheckboxChange("female")}/>
            </div>
        </div>
    )
}

export default GenderCheckbox