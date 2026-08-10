import { Compass } from 'lucide-react';
import EmptyState from '../components/EmptyState';

export default function NotFound() {
  return (
    <div className="page">
      <EmptyState
        icon={Compass}
        title="Page not found"
        message="The page you're looking for doesn't exist or may have moved."
        actionLabel="Back to dashboard"
        actionTo="/"
      />
    </div>
  );
}
