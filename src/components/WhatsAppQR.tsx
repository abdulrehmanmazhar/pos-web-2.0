import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {QRCodeSVG} from 'qrcode.react';
// import { baseUrl } from '../redux/apis/apiSlice';
const socket = io('https://pos-server-2-0.onrender.com'); // Connect to backend WebSocket

const WhatsAppQR = () => {
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
        socket.on('qr', (qr) => {
            console.log("Received QR code from backend:", qr);
            setQrCode(qr);
        });

        return () => socket.off('qr'); // Cleanup listener
    }, []);

    return (
        <div>
            <h2>Scan the QR Code to Connect WhatsApp</h2>
            {qrCode ? <QRCodeSVG value={qrCode} size={256} /> : <p>Waiting for QR Code...</p>}
        </div>
    );
};

export default WhatsAppQR;
