import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h4>OUR ROUTES </h4>
      <br />
      <h5>USER ROUTES</h5>
      <Link href='/user/signup'>User sign up</Link><br />
      <Link href='/user/login'>User login up</Link><br />

      <br />
      <h5>ADMIN ROUTES</h5>
      <Link href='/admin/signup'>Admin sign up</Link><br />
      <Link href='/admin/login'>Admin login up</Link><br />

      <br />
      <h5>AGENT ROUTES</h5>
      <Link href='/agent/signup'>Agent sign up</Link><br />
      <Link href='/agent/login'>Agent login up</Link><br />

      <br />
      <h5>BUS OPERATOR ROUTES</h5>
      <Link href='/busoperator/signup'>busoperator sign up</Link><br />
      <Link href='/busoperator/login'>busoperator login up</Link><br />

      <br />
      <h5>HOTEL OWNER ROUTES</h5>
      <Link href='/hotelowner/signup'>hotelowner sign up</Link><br />
      <Link href='/hotelowner/login'>hotelowner login up</Link><br />
    </div>
  );
}
