
import React from 'react';
import { Badge } from '@/utils/database/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface AchievementsProps {
  badges: Badge[];
}

const Achievements: React.FC<AchievementsProps> = ({ badges }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-biophilic-earth">Your Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        {badges.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Complete courses to earn badges!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map((badge) => (
              <div key={badge.id} className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-biophilic-earth">
                  <img src={badge.imageUrl || badge.image} alt={badge.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium text-biophilic-earth">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Earned on {format(new Date(badge.earnedDate || badge.dateEarned || ''), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Achievements;
