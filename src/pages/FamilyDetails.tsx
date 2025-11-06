import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { authService } from '@/api/auth';
import { familyService, FamilyDetailsResponse } from '@/api/family';
import { Plus, Users, Trash2, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AuthenticatedHeader from '@/components/AuthenticatedHeader';

const FamilyDetails = () => {
  const navigate = useNavigate();
  const { id: familyId } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [family, setFamily] = useState<FamilyDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newMemberId, setNewMemberId] = useState('');
  const [removingMemberId, setRemovingMemberId] = useState<string | null>(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    if (!familyId) {
      navigate('/families');
      return;
    }
    loadFamily();
  }, [navigate, familyId]);

  const loadFamily = async () => {
    if (!familyId) return;
    
    try {
      setLoading(true);
      const response = await familyService.getFamilyDetails(familyId);
      setFamily(response);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load family details',
        variant: 'destructive',
      });
      navigate('/families');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!familyId || !newMemberId.trim()) return;

    try {
      setIsAdding(true);
      await familyService.addMember(familyId, { user_id: newMemberId.trim() });
      
      toast({
        title: 'Success',
        description: 'Member added successfully',
      });

      setIsAddMemberDialogOpen(false);
      setNewMemberId('');
      loadFamily();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add member',
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!familyId) return;

    try {
      setRemovingMemberId(memberId);
      await familyService.removeMember(familyId, memberId);
      
      toast({
        title: 'Success',
        description: 'Member removed successfully',
      });

      // If the family was deleted (no members left), redirect
      loadFamily();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to remove member',
        variant: 'destructive',
      });
      setRemovingMemberId(null);
    }
  };

  const handleLogout = async () => {
    await authService.revokeToken();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-foreground" />
      </div>
    );
  }

  if (!family) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />

      {/* Main Content */}
      <main className="container mx-auto px-8 pt-32 pb-16">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/families')}
            className="gap-2 text-sm font-light text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            back to families
          </Button>
        </div>

        {/* Family Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-normal text-foreground mb-2 tracking-tight">
                {family.name || 'Unnamed Family'}
              </h1>
              <p className="text-lg font-normal text-muted-foreground">
                Created {new Date(family.created_at).toLocaleDateString()} • {family.members.length} {family.members.length === 1 ? 'member' : 'members'}
              </p>
            </div>
            <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-light hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <Plus className="w-5 h-5" />
                  add member
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border border-border/50 rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-light text-primary">add member to family</DialogTitle>
                  <DialogDescription className="text-muted-foreground font-light">
                    enter the user id of the person you want to add to this family.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-6">
                  <div className="space-y-3">
                    <Label htmlFor="memberId" className="text-sm font-light text-muted-foreground uppercase tracking-widest">
                      user id
                    </Label>
                    <Input
                      id="memberId"
                      placeholder="e.g., user123"
                      value={newMemberId}
                      onChange={(e) => setNewMemberId(e.target.value)}
                      className="w-full px-5 py-4 bg-background/50 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all font-light"
                    />
                  </div>
                </div>
                <DialogFooter className="gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddMemberDialogOpen(false)}
                    disabled={isAdding}
                    className="px-6 py-3 border border-border rounded-2xl font-light hover:bg-muted/50"
                  >
                    cancel
                  </Button>
                  <Button
                    onClick={handleAddMember}
                    disabled={isAdding || !newMemberId.trim()}
                    className="px-6 py-3 bg-primary text-white rounded-2xl font-light hover:shadow-lg transition-all"
                  >
                    {isAdding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    add member
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Family Members */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-light text-primary mb-8 tracking-tight">family members</h2>
          
          {family.members.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-primary/10 flex items-center justify-center">
                <Users className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-light text-primary mb-4">no members yet</h3>
              <p className="text-muted-foreground mb-8 font-light">add members to this family to get started</p>
              <Button 
                onClick={() => setIsAddMemberDialogOpen(true)} 
                className="gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-light hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                add first member
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {family.members.map((member) => (
                <div
                  key={member.id}
                  className="group relative p-6 rounded-3xl glass-card border border-border/50 hover:border-primary/30 elevated-card transition-all duration-500 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                        <span className="text-white font-light text-lg">
                          {(member.name || member.username).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            disabled={removingMemberId === member.id}
                          >
                            {removingMemberId === member.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="glass-card border border-border/50 rounded-3xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl font-light text-primary">remove member</AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground font-light">
                              are you sure you want to remove <strong>{member.name || member.username}</strong> from this family?
                              {family.members.length === 1 && (
                                <span className="block mt-2 text-destructive font-medium">
                                  warning: this is the last member. removing them will delete the entire family.
                                </span>
                              )}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-3">
                            <AlertDialogCancel className="px-6 py-3 border border-border rounded-2xl font-light hover:bg-muted/50">
                              cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveMember(member.id)}
                              className="px-6 py-3 bg-destructive text-white rounded-2xl font-light hover:shadow-lg transition-all"
                            >
                              remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <h3 className="text-lg font-light text-primary mb-1">
                      {member.name || member.username}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground">
                      {member.email || member.username}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FamilyDetails;


