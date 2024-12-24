import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
  return (
    <div>
       <Table>
            <TableCaption>A List of your recent Company</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableCell>
                    <Avatar>
                        <AvatarImage src="https://tse2.mm.bing.net/th?id=OIP.NXILvymg8PHUgZW6_b7fegHaHa&pid=Api&P=0&h=180"></AvatarImage>
                    </Avatar>
                </TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>18-04-2024</TableCell>
                <TableCell className='text-right cursor-pointer'>
                    <Popover>
                        <PopoverTrigger><MoreHorizontal></MoreHorizontal></PopoverTrigger>
                        <PopoverContent className='w-32'>
                            <div className='flex items-center gap-2 cursor-pointer'>
                                <Edit2 className='w-4'></Edit2>
                                <span>Edit</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableBody>
       </Table>
    </div>
  )
}

export default CompaniesTable
