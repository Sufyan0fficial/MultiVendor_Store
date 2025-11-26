import React, { useEffect, useState } from "react";
import { Message } from "../utils/notifymessage";
import { DeleteEvent, DeleteProduct } from "../api/routes";

function ProfileTable({ headers, data, className, type, messageApi, setData, handleDelete }) 
{

    return (
        <div className="max-w-full overflow-x-auto">
            <div className={`${className}`}>
                {/* Table Header */}
                <div className="w-full flex border-b mb-2 py-4 font-semibold justify-between">
                    {headers.map((header, index) => (
                        <div
                            key={index}
                            className={`min-w-[200px] max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis border-r pl-2 border-gray-300 flex justify-center items-center ${index === headers.length - 1 ? "border-r-0" : ""
                                }`}
                        >
                            {header.name}
                        </div>
                    ))}
                </div>

                {/* Table Rows */}
                {data?.length > 0 && data.map((order, i) => (
                    <div
                        key={i}
                        className="w-full flex border-b border-b-gray-300 hover:bg-gray-50 transition-all py-3"
                    >
                        {headers.map((header, j) => (
                            <div
                                key={j}
                                className={`!min-w-[200px] max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis pl-2  text-gray-700 text-sm flex justify-center items-center 
                                }`}
                                // onClick={() => handleDelete(order)}
                            >
                                {
                                    header.key === 'total_price' ? ('$' + order[header.key]) : order[header.key]
                                }



                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {
                (data?.length === 0 || !data) &&
                <div className="text-center my-10 ">
                    No Data found !
                </div>
            }
        </div>
    );
}

export default ProfileTable;
