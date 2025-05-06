
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Certificate as CertificateType } from '@/utils/database/types';
import { Download } from 'lucide-react';
import { format } from 'date-fns';

interface CertificateProps {
  certificate: CertificateType;
  userName: string;
}

const Certificate: React.FC<CertificateProps> = ({ certificate, userName }) => {
  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('In a production app, this would download a PDF certificate.');
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-biophilic-earth text-white p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000')] bg-no-repeat bg-center bg-cover"></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold mb-2">Certificate of Completion</h2>
          <p className="text-lg">This is to certify that</p>
          <h3 className="text-3xl font-bold my-4 italic">{userName}</h3>
          <p className="text-lg mb-6">has successfully completed</p>
          <h4 className="text-xl font-semibold mb-4">"{certificate.courseTitle || certificate.courseName}"</h4>
          <p className="text-sm mb-2">Issued on: {format(new Date(certificate.issueDate), 'MMMM d, yyyy')}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Certificate ID: {certificate.id.substring(0, 8)}</p>
          </div>
          <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
            <Download size={16} /> Download PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Certificate;
