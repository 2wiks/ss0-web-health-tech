import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/api/auth';
import { familyService, FamilyResponse } from '@/api/family';
import { Plus, Users, ArrowRight, Loader2, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AuthenticatedHeader from '@/components/AuthenticatedHeader';

const Families = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [families, setFamilies] = useState<FamilyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newFamilyMembers, setNewFamilyMembers] = useState('');

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadFamilies();
  }, [navigate]);

  const loadFamilies = async () => {
    try {
      setLoading(true);
      const response = await familyService.getFamilies();
      setFamilies(response.families);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load families',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFamily = async () => {
    try {
      setIsCreating(true);
      const members = newFamilyMembers
        .split(',')
        .map(m => m.trim())
        .filter(m => m.length > 0);

      const request: any = {};
      if (newFamilyName.trim()) {
        request.name = newFamilyName.trim();
      }
      if (members.length > 0) {
        request.members = members;
      }

      await familyService.createFamily(request);
      
      toast({
        title: 'Success',
        description: 'Family created successfully',
      });

      setIsCreateDialogOpen(false);
      setNewFamilyName('');
      setNewFamilyMembers('');
      loadFamilies();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create family',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleLogout = async () => {
    await authService.revokeToken();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />

      {/* Main Content */}
      <main className="container mx-auto px-8 pt-32 pb-16">
        {/* Greeting */}
        <div className="max-w-6xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-normal text-foreground mb-2 tracking-tight">
            Family Groups
          </h1>
          <p className="text-lg font-normal text-muted-foreground">
            Manage your family health data
          </p>
        </div>

        {/* Create Family Button */}
        <div className="max-w-6xl mx-auto mb-12">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-md font-normal hover:bg-primary/90 transition-colors">
                <Plus className="w-5 h-5" />
                Create Family
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border border-border rounded-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-normal text-card-foreground">Create New Family</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Create a new family group. You can add members now or later.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-light text-muted-foreground uppercase tracking-widest">
                    family name (optional)
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., the smith family"
                    value={newFamilyName}
                    onChange={(e) => setNewFamilyName(e.target.value)}
                    className="w-full px-5 py-4 bg-background/50 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all font-light"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="members" className="text-sm font-light text-muted-foreground uppercase tracking-widest">
                    member ids (optional)
                  </Label>
                  <Input
                    id="members"
                    placeholder="e.g., user123, user456"
                    value={newFamilyMembers}
                    onChange={(e) => setNewFamilyMembers(e.target.value)}
                    className="w-full px-5 py-4 bg-background/50 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all font-light"
                  />
                  <p className="text-sm text-muted-foreground font-light">
                    comma-separated list of user ids to add as members
                  </p>
                </div>
              </div>
              <DialogFooter className="gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={isCreating}
                  className="px-6 py-3 border border-border rounded-2xl font-light hover:bg-muted/50"
                >
                  cancel
                </Button>
                <Button 
                  onClick={handleCreateFamily} 
                  disabled={isCreating}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-teal text-white rounded-2xl font-light hover:shadow-lg transition-all"
                >
                  {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Families List */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : families.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/10 to-teal/10 flex items-center justify-center">
                <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-light text-primary mb-4">no families yet</h3>
              <p className="text-muted-foreground mb-8 font-light">create your first family group to get started</p>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)} 
                className="gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-md font-normal hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                create your first family
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {families.map((family) => {
                const familyId = family.id || family._id || '';
                return (
                <div
                  key={familyId}
                  className="group cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Navigating to family:', familyId, family);
                    navigate(`/families/${familyId}`);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/families/${familyId}`);
                    }
                  }}
                >
                  <div className="group relative p-8 rounded-3xl glass-card border border-border/50 hover:border-primary/30 elevated-card transition-all duration-500 hover:scale-105 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-teal/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" strokeWidth={1.5} />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-xl font-light text-primary mb-2">
                        {family.name || 'unnamed family'}
                      </h3>
                      <p className="text-sm font-light text-muted-foreground mb-4">
                        {family.members.length} {family.members.length === 1 ? 'member' : 'members'}
                      </p>
                      <p className="text-xs font-light text-muted-foreground/70">
                        created {new Date(family.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Families;


