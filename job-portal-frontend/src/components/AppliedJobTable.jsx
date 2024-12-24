import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A List of Your Applied Job</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                [1,2,3,4].map((item,index)=>{
                    return (
                        <TableRow>
                            <TableCell>1-Oct-2024</TableCell>
                            <TableCell>Full Stack Developer</TableCell>
                            <TableCell>Google</TableCell>
                            <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                        </TableRow>
                    )
                })
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
