import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteActions } from "../../store/deleteModal";
import { useFetchPage } from "../../hooks/fetchDataPagination";
import Modal from "../UI/ConfirmDeleteModal";
import classes from "./Table.module.css";

export default function RoomTable() {
  const isOpen = useSelector((state) => state.delete.isOpen);
  const reload = useSelector((state) => state.delete.reload);
  const dispatch = useDispatch();
  const {
    data: roomPage,
    isLoading,
    err,
    page,
    setPage,
  } = useFetchPage("fetch-all-room", 8, reload);

  return (
    <>
      <section className="shadow-lg mt-2">
        <div className="py-10 px-8">
          <div className="flex justify-between">
            {" "}
            <h2 className="text-2xl text-neutral-500 ">Rooms List</h2>
            <Link
              to="/new-room"
              className="p-1 font-medium text-emerald-600 border-emerald-600 border-x border-y border-solid rounded"
            >
              Add New
            </Link>
          </div>
          {roomPage.rooms && (
            <table className={classes.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>
                    {" "}
                    <div>ID</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Title</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Description</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Price</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Max People</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Action</div>{" "}
                  </th>
                </tr>
              </thead>

              <tbody>
                {" "}
                {roomPage.rooms.map((room) => (
                  <tr key={room._id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{room._id}</td>
                    <td>{room.title}</td>
                    <td>
                      {room.desc.length > 40
                        ? `${room.desc.slice(0, 60)}...`
                        : room.desc}
                    </td>
                    <td>{room.price}</td>
                    <td>{room.maxPeople}</td>
                    <td>
                      {/* Edit Button */}
                      <Link
                        to={`/edit-room/${room._id}`}
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
                              title: room._id,
                              route: "delete-room",
                              id: room._id,
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
                {page} / {roomPage.maxPage}
              </span>
              <i
                onClick={() => {
                  page !== 1 && setPage((preState) => preState - 1);
                }}
                className="fa-solid fa-angle-left text-xl text-neutral-500 hover:text-neutral-800 cursor-pointer"
              ></i>
              <i
                onClick={() => {
                  page !== roomPage.maxPage &&
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
