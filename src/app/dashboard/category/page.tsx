"use client";
import CategoryForm from "@/components/CategoryForm";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  deleteCategory,
  getCategories,
} from "@/actions/category/categoryActions";
import { categoryData } from "@/lib/definitions";
import { CiMenuKebab } from "react-icons/ci";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdDelete, MdEdit } from "react-icons/md";
const page = () => {
  const [category, setCategory] = useState<categoryData[]>([]);
  const handleDelete = async (id: string) => {
    try {
      if (window.confirm("are you sure you want to delete this category!")) {
        await deleteCategory(id).then((data) => {
          if (data?.success) {
            toast.success(data.success);
          } else {
            toast.error(data?.error as any);
          }
        });
      }
    } catch (error) {
      throw new Error(error as any).message;
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "description",
      headerName: "Description",
      width: 450,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <div className="space-x-3">
            <Popover>
              <PopoverTrigger>
                <CiMenuKebab size={20} />
              </PopoverTrigger>
              <PopoverContent className="w-full flex flex-row justify-start items-center gap-5">
                <MdDelete
                className="cursor-pointer"
                  size={20}
                  onClick={() => handleDelete(params.row.id)}
                />
                <MdEdit className="cursor-pointer" size={20} />
              </PopoverContent>
            </Popover>
          </div>
        </>
      ),
    },
  ];

  const fetchCategories = async () => {
    try {
      await getCategories().then((data) => {
        if (data.data) {
          setCategory(data.data);
        }
      });
    } catch (error) {
      throw new Error(error as any).message;
    }
  };

  useEffect(() => {
    fetchCategories();
    return () => {};
  }, []);

  return (
    <div className="w-full p-3 space-y-4">
      <div className="w-full flex flex-row justify-betweenn items-center gap-5">
        <h1 className="w-full text-xl tracking-widest">Category</h1>
        <div className="flex flex-row justify-end items-center">
          <CategoryForm />
        </div>
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={category}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          getRowId={(row) => row.id}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default page;
