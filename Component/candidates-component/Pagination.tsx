import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
interface PaginationProps {
  itemsPerPage?: number;
  candidates: Candidate[] | string;
}

export interface Candidate {
  _id: string;
  profilePicture: string;
  experience: string;
  fullName: string;
  title: string;
  education: string;
  gender: string;
  location?: string;
  level?: string;
  category?: string;
  createdAt?: string;
  popularityScore?: number;
}

  export function PaginationDemo({itemsPerPage, candidates }: PaginationProps) {

    
    if(itemsPerPage ){
      itemsPerPage = itemsPerPage > 0 ? itemsPerPage : 10;
    }

    return (
      <Pagination className="py-7">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  