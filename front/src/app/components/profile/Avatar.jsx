import React, { useState} from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/components/modal.css";
import { FaPenSquare } from "react-icons/fa";
import { profilUpdate } from "../../api/backend/profil";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

const FormAvatar = ({setRefresh}) => {

  const [modal, setModal] = useState(false);
  
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);

  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const closeModal = () => {
    setModal(!modal);
  };




  const handleUpdAvatar = (values) => {
    profilUpdate(values, userId, token)
    .then((res) => {
      if (res.status === 200 && res.data) {
        setRefresh(prevState => !prevState);
      }
    })
    .catch(() => error);
  };



  return (
    <div className="flex justify-end pr-4 sm:pr-[65px]" >
      <button onClick={toggleModal} className="flex justify-center">
      <span><FaPenSquare className="h-7 w-7 text-rose-300 hover:text-rose-400" aria-hidden="true"/></span>
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <Formik
              initialValues={{ 
                avatar:""
            }} 
              onSubmit={(user) => {
                handleUpdAvatar(user);
                closeModal();
              }}
            >
              {({ handleChange, handleBlur }) => (
                <Form className="mt-8 ">
                  <div className="flex flex-col rounded-md shadow-sm grid grid-cols-4">
                    <div >
                    <img
                        style={{width: 100, height: 100, marginRight:20, marginLeft:20, marginTop:40}}  
                        src='./src/app/assets/images/avatar/Avatar1.png'
                    />
                    {/* AVATAR 1 */}
                    <Field
                      type="radio"
                      name="avatar"
                      value="./src/app/assets/images/avatar/Avatar1.png"
                      style={{marginRight:20, marginLeft:20, marginBottom:40}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
                    />
                    </div>
                    <div >
                    <img
                        style={{width: 100, height: 100, marginRight:20, marginLeft:20, marginTop:40}}  
                        src='./src/app/assets/images/avatar/Avatar2.png'  
                    />
                    {/* AVATAR 2 */}
                    <Field
                      type="radio"
                      name="avatar"
                      value="./src/app/assets/images/avatar/Avatar2.png"
                      style={{marginRight:20, marginLeft:20}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
                    />
                    </div>
                    <div>
                    <img
                        style={{width: 100, height: 100, marginRight:20, marginLeft:20, marginTop:40}}  
                        src='./src/app/assets/images/avatar/Avatar3.png'  
                    />
                    {/* AVATAR 3 */}
                    <Field
                      type="radio"
                      name="avatar"
                      value="./src/app/assets/images/avatar/Avatar3.png"
                      style={{marginRight:20, marginLeft:20}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
                    />
                    </div>

                    <div>
                    <img
                        style={{width: 100, height: 100, marginRight:20, marginLeft:20, marginTop:40}}  
                        src='./src/app/assets/images/avatar/Avatar4.png'  
                    />
                    {/* AVATAR 4 */}
                    <Field
                      type="radio"
                      name="avatar"
                      value="./src/app/assets/images/avatar/Avatar4.png"
                      style={{marginRight:20, marginLeft:20}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
                    />
                    </div>

                    <div>
                    <img
                        style={{width: 100, height: 100, marginRight:20, marginLeft:20}}  
                        src='./src/app/assets/images/avatar/Avatar5.png'  
                    />
                    {/* AVATAR 5 */}
                    <Field
                      type="radio"
                      name="avatar"
                      value="./src/app/assets/images/avatar/Avatar5.png"
                      style={{marginRight:20, marginLeft:20, marginBottom:40}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
                    />
                    </div>

                    <div>
                    <img
                        style={{width: 100, height: 100, marginRight:20, marginLeft:20}}  
                        src='./src/app/assets/images/avatar/Avatar6.png'  
                    />
                    {/* AVATAR 6 */}
                    <Field
                      type="radio"
                      name="avatar"
                      value="./src/app/assets/images/avatar/Avatar6.png"
                      style={{marginRight:20, marginLeft:20}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
                    />
                    </div>

                    <div>
                    <img
                        style={{width: 100, height: 100, marginRight:20, marginLeft:20}}  
                        src='./src/app/assets/images/avatar/Avatar7.png'  
                    />
                    {/* AVATAR 7 */}
                    <Field
                      type="radio"
                      name="avatar"
                      value="./src/app/assets/images/avatar/Avatar7.png"
                      style={{marginRight:20, marginLeft:20}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
                    />
                    </div>

                    <div>
                    <img
                        style={{width: 100, height: 100, marginLeft:20}}  
                        src='./src/app/assets/images/avatar/Avatar8.png'  
                    />
                    {/* AVATAR 8 */}
                    <Field
                      type="radio"
                      name="avatar"
                      value="./src/app/assets/images/avatar/Avatar8.png"
                      style={{marginRight:20, marginLeft:20}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
                    />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn bg-rose-400 hover:bg-rose-300 group relative w-full"
                    >
                      Valider
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
)}

export default FormAvatar;