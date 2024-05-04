import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteActions } from "../../store/deleteModal";
import { useFetchPage } from "../../hooks/fetchDataPagination";
import Modal from "../UI/ConfirmDeleteModal";
import classes from "./Table.module.css";

export default function HotelTable() {
  const isOpen = useSelector((state) => state.delete.isOpen);
  const reload = useSelector((state) => state.delete.reload);
  const dispatch = useDispatch();
  const {
    data: hotelPage,
    isLoading,
    err,
    page,
    setPage,
  } = useFetchPage("fetch-all-hotel", 8, reload);

  return (
    <>
      <section className="shadow-lg mt-2">
        <div className="py-10 px-8">
          <div className="flex justify-between">
            {" "}
            <h2 className="text-2xl text-neutral-500 ">Hotels List</h2>
            <Link
              to="/new-hotel"
              className="p-1 font-medium text-emerald-600 border-emerald-600 border-x border-y border-solid rounded"
            >
              Add New
            </Link>
          </div>
          {hotelPage.hotels && (
            <table className={classes.table}>
              <thead>
                {" "}
                <tr>
                  <th></th>
                  <th>
                    {" "}
                    <div>ID</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Name</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Type</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Title</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>City</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Action</div>{" "}
                  </th>
                </tr>
              </thead>

              <tbody>
                {hotelPage.hotels.map((hotel) => (
                  <tr key={hotel._id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{hotel._id}</td>
                    <td>{hotel.name}</td>
                    <td>{hotel.type}</td>
                    <td>{hotel.title}</td>
                    <td>{hotel.city}</td>
                    <td>
                      {/* Edit Button */}
                      <Link
                        to={`/edit-hotel/${hotel._id}`}
                        className="p-1 font-medium text-blue-500 border-blue-500 hover:text-blue-700 hover:border-blue-700 border-x border-y border-solid rounded mr-2"
                      >
                        Edit
                      </Link>
                      {/* Delete Button */}
                      <button
                        // Open delete confirmation modal
                        onClick={() => {
                          dispatch(
                            deleteActions.openModal({
                              title: hotel.name,
                              route: "delete-hotel",
                              id: hotel._id,
                            })
                          );
                        }}
                        className="p-1 font-medium text-rose-500 border-rose-500 hover:text-rose-700 hover:border-rose-700 border-x border-y border-solid rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="flex justify-end mt-5">
            <div>
              <span className="mr-4">
                {page} / {hotelPage.maxPage}
              </span>
              <i
                onClick={() => {
                  page !== 1 && setPage((preState) => preState - 1);
                }}
                className="fa-solid fa-angle-left text-xl text-neutral-500 hover:text-neutral-800 cursor-pointer"
              ></i>
              <i
                onClick={() => {
                  page !== hotelPage.maxPage &&
                    setPage((preState) => preState + 1);
                }}
                className="fa-solid fa-angle-right text-xl text-neutral-500 hover:text-neutral-800 cursor-pointer ml-5"
              ></i>
            </div>
          </div>
        </div>
      </section>
      {isOpen && <Modal></Modal>}
    </>
  );
}
