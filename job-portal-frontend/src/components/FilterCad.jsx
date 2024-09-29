import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
    {
        filterType:"Location",
        array:["Gurugram","Banglore","Chennai","Hyderbad"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer","Backened Developer","FullStack Developer"]
    },
    {
        filterType:"Salary",
        array:["0-40k","40k-1lakh","2lakh","5lakh"]
    },
]
const FilterCad = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup>
            {
                filterData.map((data,index)=>(
                    <div>
                        <h1 className='font-medium text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item,index)=>{
                                return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item}></RadioGroupItem>
                                        <Label className='text-sm text-gray-600'>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCad
