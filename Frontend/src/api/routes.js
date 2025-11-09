import { axiosInstance } from "./config";

export const Register = async (formData) => {
  return await axiosInstance.post("/auth/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const ActivateUserAccount = async (str) => {
  return await axiosInstance.post("/auth/activation", str);
};
export const UserLogin = async(payload)=>{
  return await axiosInstance.post('/auth/signin',payload)
}
export const UpdateProfile = async(payload,id)=>{
  return await axiosInstance.patch(`/auth/update/${id}`,payload,{headers:{"Content-Type":'multipart/form-data'}})
}
export const UserLogout = async()=>{
  return await axiosInstance.get('/auth/logout')
}



//User

export const UpdateAddress = async(payload,id)=>{
  return await axiosInstance.patch(`/user/add-address/${id}`,payload)
}
export const EditAddress = async(payload,id)=>{
  return await axiosInstance.patch(`/user/edit-address/${id}`,payload)
}
export const DeleteAddress = async(payload,id)=>{
  return await axiosInstance.patch(`/user/delete-address/${id}`,payload)
}




// Seller Auth 

export const SellerRegister = async(payload)=>{
  return await axiosInstance.post('/seller/auth/signup',payload,{
    headers:{
      "Content-Type":'multipart/form-data'
    }
  })
}
export const SellerVerification = async(payload)=>{
  return await axiosInstance.post('/seller/auth/activation',payload)
}

export const Seller_Login = async(payload)=>{
  return await axiosInstance.post('/seller/auth/login',payload)
}


export const Logout_Seller = async()=>{
  return await axiosInstance.get('/seller/auth/logout')
}

export const Get_ShopData = async(id)=>{
  return await axiosInstance.get(`/seller/auth/shop-profile/${id}`)
}


 
//Products

export const Create_Product = async(payload)=>{
  return axiosInstance.post('/seller/product/create-product',payload,{headers:{
    "Content-Type":'multipart/form-data'
  }})
}

export const Get_Products = async(id)=>{
  return axiosInstance.get(`/seller/product/get-all-products/${id}`)
}

export const DeleteProduct = async(id)=>{
  return axiosInstance.delete(`/seller/product/delete/${id}`)
}

export const fetchProduct = async(id)=>{
  return axiosInstance.get(`/seller/product/${id}`)
}

export const fetchallProducts = async()=>{
  return axiosInstance.get(`/seller/product/get-all-products`)
}
export const Filters = async(queryString)=>{
  return axiosInstance.get(`/seller/product/search?${queryString}`)
}
export const updateInventory = async(payload)=>{
  return axiosInstance.patch(`/seller/product/update-inventory`,payload)
}


//Evetns
export const Create_Event = async(payload)=>{
  return axiosInstance.post('/seller/event/create-event',payload,{headers:{
    "Content-Type":'multipart/form-data'
  }})
}

export const Get_Events = async(id)=>{
  return axiosInstance.get(`/seller/event/get-all-events/${id}`)
}

export const DeleteEvent = async(id)=>{
  return axiosInstance.delete(`/seller/event/delete/${id}`)
}

export const Get_All_Events = async(query)=>{
  return axiosInstance.get(`/seller/event/get-all-events?${query}`)
}






//Coupons

export const Create_Coupon = async(paylod)=>{
  return axiosInstance.post(`/seller/coupon/create-coupon`,paylod)
}
export const Get_Coupons = async(id)=>{
  return axiosInstance.get(`/seller/coupon/get-all-coupons/${id}`)
}
export const ApplyCoupon = async(payload)=>{
  return axiosInstance.post(`/seller/coupon/apply-coupon-code`,payload)
}

export const DeleteCoupon = async(id)=>{
  return axiosInstance.delete(`/seller/coupon/delete/${id}`)
}



//payment


export const StripeCheckOutSession= async(payload)=>{
  return axiosInstance.post(`/payment/stripe-checkout-session`,payload)
}
export const StripeCheckOutSessionVerification= async(payload)=>{
  return axiosInstance.post(`/payment/stripe-checkout-session-verification`,payload)
}



//Order


export const CreateOrder= async(payload)=>{
  return axiosInstance.post(`/order/create-orders`,payload)
}
export const getCustomerOrders= async(id)=>{
  return axiosInstance.post(`/order/get-customer-orders/${id}`)
}
export const getVendorOrders= async(id)=>{
  return axiosInstance.post(`/order/get-vendor-orders/${id}`)
}

export const getorderdetails= async(id)=>{
  return axiosInstance.post(`/order/get-order-details/${id}`)
}
export const updateorderstatus= async(id,payload)=>{
  return axiosInstance.patch(`/order/update-order-status/${id}`,payload)
}
