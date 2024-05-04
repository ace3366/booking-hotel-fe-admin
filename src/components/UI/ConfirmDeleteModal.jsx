import { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteActions } from "../../store/deleteModal";
import { sendDeleteRequest } from "../../util/sendDeleteRequest";

import classes from "./ConfirmDeleteModal.module.css";

let modalRoot = document.getElementById("modal-root");

// Kiểm tra có sẵn thẻ div để gắn ra body chưa
if (!modalRoot) {
  const newModal = document.createElement("div");
  newModal.id = "modal-root";
  document.body.appendChild(newModal);
  modalRoot = newModal;
}

export default function Modal({ toggleModal }) {
  const dispatch = useDispatch();
  const deleteInfo = useSelector((state) => state.delete.deleteInfo);
  const deletable = useSelector((state) => state.delete.deletable);
  return createPortal(
    <div className={classes.modal}>
      <div className={classes["modal-backdrop"]}></div>{" "}
      <div className={classes["modal-content"]}>
        <div className="py-6 px-7">
          {/* Modal title */}
          {deletable ? (
            <h3>
              {" "}
              Are you sure to delete
              <span className="text-rose-700"> {deleteInfo.title} </span>?
            </h3>
          ) : (
            <h3>This hotel is in a transaction, you can not delete it now</h3>
          )}

          {/* Modal action */}
          <div className="mt-10 flex justify-between w-3/5 mx-auto">
            <button
              className="text-neutral-200 bg-green-700 p-1 rounded hover:bg-green-600 w-20"
              onClick={() => {
                if (deletable) {
                  sendDeleteRequest(deleteInfo.route, deleteInfo.id).then(
                    (res) => {
                      if (res.message === "Deleted") {
                        dispatch(deleteActions.reload());
                        dispatch(deleteActions.closeModal());
                      } else if (res.message === "Can not delete") {
                        dispatch(deleteActions.canNotDelete());
                      }
                    }
                  );
                } else {
                  dispatch(deleteActions.closeModal());
                }
              }}
            >
              Confirm
            </button>

            {/* Cancel delete button */}
            <button
              className="text-neutral-200 bg-red-700 p-1 rounded hover:bg-red-600 w-20"
              onClick={() => {
                dispatch(deleteActions.closeModal());
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
