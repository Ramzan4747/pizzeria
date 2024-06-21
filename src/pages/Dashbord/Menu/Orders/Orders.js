import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { firestore } from '../../../../config/firebase';
import { AuthContext } from '../../../../context/AuthContext';


export default function Orders() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        console.log('Fetching cart data for all users');
        const cartRef = collection(firestore, 'carts');
        const querySnapshot = await getDocs(cartRef);
        const allUsersCartData = querySnapshot.docs.map((doc) => doc.data().items);
        console.log('Fetched cart data for all users:', allUsersCartData);
        setProducts(allUsersCartData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);


  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-12">
          <h5>Orders</h5>
          <p className="fw-semibold">
            <Link className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
            <Link className="text-decoration-none text-dark">Orders</Link>
          </p>
        </div>
      </div>
      <div className="row px-4">
        <div className="col-12 mt-4">
          <div className="card border-0 py-4 px-2">
            {!isLoading ? (
              products.length > 0 ? (
                <div className="table-responsive">


                  {/* <Table className="table  ">
                      <Thead className='bg-dark'>
                        <Tr>
                         
                          <Th scope="col">Type</Th>
                          <Th scope="col">Name</Th>
                          <Th scope="col">Quantity</Th>
                          <Th scope="col">Price</Th>
                          <Th scope="col">Status</Th>
                          <Th scope="col">Detail</Th>

                        </Tr>
                      </Thead>
                      {products.map((items, i) => (
                      <Tbody  key={i}>
                        {items.map((item, i) => (
                          <Tr key={i}>

                           
                            <Td colspan="" className="">
                              <span className="d-inline-block ps-1 ">{item.type}</span>
                            </Td>
                            <Td className="my-auto">{item.name}</Td>
                            <Td className="">
                              {item.qty}
                            </Td>
                            <Td >{item.price}</Td>
                            <Td >{item.status}</Td>
                            
                          </Tr>
                        ))}

                      </Tbody>
                      ))}
                    </Table> */}
                  {products.map((items, i) => (
                    <div key={i}>
                      <h5>Order {i + 1}</h5>
                      <Table className="table">
                        <Thead className='bg-dark'>
                          <Tr>
                            <Th scope="col">S.No.</Th>
                            <Th scope="col">Type</Th>
                            <Th scope="col">Name</Th>
                            <Th scope="col">Price</Th>
                            <Th scope="col">Quantity</Th>
                            <Th scope="col">Total</Th>
                            <Th scope="col">Status</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {items.map((item, index) => (
                            <Tr key={index}>
                              <Td className="my-auto">{index + 1}</Td>
                              <Td>{item.type}</Td>
                              <Td>{item.name}</Td>
                              <Td>{item.price}</Td>
                              <Td  ><div className="ps-md-4">{item.qty}</div></Td>
                              <Td>{item.total}</Td>
                              <Td>{item.status}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </div>
                  ))}

                </div>
              ) : (
                <p className="text-center text-danger fs-4">No Product Is Available</p>

              )
            ) : (
              <div className="text-center">
                <div className="spinner spinner-grow"></div>
              </div>
            )}


          </div>
        </div>
      </div>

    </div>
  )
}
