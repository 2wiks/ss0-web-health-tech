import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { syncService, HealthMethod, SyncDailyDoc } from '@/api/sync';
import { useToast } from '@/hooks/use-toast';
import { extractNumber } from '@/lib/utils';
import { ArrowLeft, RefreshCw, Calendar, Database, Eye, EyeOff } from 'lucide-react';

const categoryNames: Record<HealthMethod, string> = {
  heartRate: 'Heart Rate',
  restingHeartRate: 'Resting Heart Rate',
  vo2Max: 'VO2 Max',
  bloodPressure: 'Blood Pressure',
  bodyFat: 'Body Fat',
  leanBodyMass: 'Lean Body Mass',
  weight: 'Weight',
  respiratoryRate: 'Respiratory Rate',
  oxygenSaturation: 'Oxygen Saturation',
  bloodGlucose: 'Blood Glucose',
  sleepSession: 'Sleep Session',
  steps: 'Steps',
};

const CategoryDetails = () => {
  const { method } = useParams<{ method: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [summaryDoc, setSummaryDoc] = useState<SyncDailyDoc | null>(null);
  const [rawDocs, setRawDocs] = useState<SyncDailyDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRawData, setShowRawData] = useState(false);
  const [isLoadingRaw, setIsLoadingRaw] = useState(false);

  const categoryName = method ? categoryNames[method as HealthMethod] : 'Unknown Category';

  const loadSummaryData = async (showRefreshingState = false) => {
    if (!method) return;

    if (showRefreshingState) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const result = await syncService.fetchData(method as HealthMethod);
      
      if (result.success && result.data && result.data.length > 0) {
        // Sort by date descending and get the most recent
        const sorted = [...result.data].sort((a, b) => 
          (b.date || b._id).localeCompare(a.date || a._id)
        );
        setSummaryDoc(sorted[0]);
        
        if (showRefreshingState) {
          toast({
            title: 'Data refreshed',
            description: `${categoryName} data has been updated`,
          });
        }
      } else {
        setSummaryDoc(null);
      }
    } catch (error) {
      toast({
        title: 'Error loading data',
        description: error instanceof Error ? error.message : 'Failed to load health records',
        variant: 'destructive',
      });
      setSummaryDoc(null);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const loadRawData = async () => {
    if (!method) return;

    setIsLoadingRaw(true);
    try {
      const result = await syncService.fetchData(method as HealthMethod, { 
        granularity: 'raw' 
      });
      
      if (result.success && result.data) {
        const sorted = [...result.data].sort((a, b) => 
          (b.date || b._id).localeCompare(a.date || a._id)
        );
        setRawDocs(sorted);
        setShowRawData(true);
      } else {
        throw new Error(result.error || 'Failed to fetch raw data');
      }
    } catch (error) {
      toast({
        title: 'Error loading raw data',
        description: error instanceof Error ? error.message : 'Failed to load detailed records',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingRaw(false);
    }
  };

  useEffect(() => {
    loadSummaryData();
  }, [method]);

  const handleRefresh = () => {
    loadSummaryData(true);
    if (showRawData) {
      loadRawData();
    }
  };

  const toggleRawData = () => {
    if (showRawData) {
      setShowRawData(false);
    } else {
      if (rawDocs.length === 0) {
        loadRawData();
      } else {
        setShowRawData(true);
      }
    }
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading health records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-card shadow-[var(--shadow-soft)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{categoryName}</h1>
                <p className="text-sm text-muted-foreground">
                  {summaryDoc ? `Latest data from ${formatDate(summaryDoc.date)}` : 'No data available'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {summaryDoc && (
                <Button
                  onClick={toggleRawData}
                  disabled={isLoadingRaw}
                  variant="outline"
                  className="gap-2"
                >
                  {isLoadingRaw ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : showRawData ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  {showRawData ? 'Hide all data' : 'View all data'}
                </Button>
              )}
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!summaryDoc ? (
          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardHeader>
              <CardTitle>No Records Found</CardTitle>
              <CardDescription>
                There are no {categoryName.toLowerCase()} records available yet.
                Sync your device to see data here.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Latest Summary</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(summaryDoc.date)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Aggregate Values */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {summaryDoc.aggregate.value !== undefined && summaryDoc.aggregate.value !== null && (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Value</p>
                      <p className="text-2xl font-bold">{extractNumber(summaryDoc.aggregate.value)?.toFixed(2) ?? 'N/A'}</p>
                    </div>
                  )}
                  {summaryDoc.aggregate.total !== undefined && (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Total</p>
                      <p className="text-2xl font-bold">{extractNumber(summaryDoc.aggregate.total)?.toFixed(2) ?? 'N/A'}</p>
                    </div>
                  )}
                  {summaryDoc.aggregate.recordCount !== undefined && (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Record Count</p>
                      <p className="text-2xl font-bold">{extractNumber(summaryDoc.aggregate.recordCount) ?? 'N/A'}</p>
                    </div>
                  )}
                  {(summaryDoc.aggregate.dailyAvg !== undefined || summaryDoc.aggregate.dailyAverage !== undefined) && (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Daily Average</p>
                      <p className="text-2xl font-bold">
                        {extractNumber(summaryDoc.aggregate.dailyAvg ?? summaryDoc.aggregate.dailyAverage)?.toFixed(2) ?? 'N/A'}
                      </p>
                    </div>
                  )}
                  {summaryDoc.aggregate.dailyMin !== undefined && (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Daily Min</p>
                      <p className="text-2xl font-bold">{extractNumber(summaryDoc.aggregate.dailyMin)?.toFixed(2) ?? 'N/A'}</p>
                    </div>
                  )}
                  {summaryDoc.aggregate.dailyMax !== undefined && (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Daily Max</p>
                      <p className="text-2xl font-bold">{extractNumber(summaryDoc.aggregate.dailyMax)?.toFixed(2) ?? 'N/A'}</p>
                    </div>
                  )}
                  {summaryDoc.aggregate.totalSamples !== undefined && (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Total Samples</p>
                      <p className="text-2xl font-bold">{extractNumber(summaryDoc.aggregate.totalSamples) ?? 'N/A'}</p>
                    </div>
                  )}
                  {summaryDoc.aggregate.totalSessions !== undefined && (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Total Sessions</p>
                      <p className="text-2xl font-bold">{extractNumber(summaryDoc.aggregate.totalSessions) ?? 'N/A'}</p>
                    </div>
                  )}
                  {summaryDoc.aggregate.totalDurationMinutes !== undefined && (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Total Duration</p>
                      <p className="text-2xl font-bold">{extractNumber(summaryDoc.aggregate.totalDurationMinutes) ?? 'N/A'} min</p>
                    </div>
                  )}
                </div>

                {/* Data Origins */}
                {summaryDoc.dataOrigins && summaryDoc.dataOrigins.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Data Sources
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {summaryDoc.dataOrigins.map((origin, idx) => (
                        <Badge key={idx} variant="secondary">
                          {origin.replace('com.google.android.apps.', '').replace('com.', '')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Raw Data Section */}
            {showRawData && rawDocs.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Detailed Data</h2>
                
                {rawDocs.map((doc, docIndex) => (
                  <Card key={doc._id || docIndex} className="hover:shadow-[var(--shadow-medium)] transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{formatDate(doc.date)}</span>
                        <Badge>{doc.type}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Hourly Data */}
                      {doc.hourly && doc.hourly.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Hourly Breakdown</p>
                          <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-border">
                                  <th className="text-left p-2">Hour</th>
                                  <th className="text-right p-2">Avg</th>
                                  <th className="text-right p-2">Min</th>
                                  <th className="text-right p-2">Max</th>
                                  <th className="text-right p-2">Samples</th>
                                </tr>
                              </thead>
                              <tbody>
                                {doc.hourly.map((h, idx) => (
                                  <tr key={idx} className="border-b border-border/50 last:border-0">
                                    <td className="p-2">{extractNumber(h.hour) ?? idx}:00</td>
                                    <td className="text-right p-2">{extractNumber(h.avg)?.toFixed(2) ?? 'N/A'}</td>
                                    <td className="text-right p-2">{extractNumber(h.min)?.toFixed(2) ?? 'N/A'}</td>
                                    <td className="text-right p-2">{extractNumber(h.max)?.toFixed(2) ?? 'N/A'}</td>
                                    <td className="text-right p-2">{extractNumber(h.samples) ?? 'N/A'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Measurements */}
                      {doc.measurements && doc.measurements.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Measurements ({doc.measurements.length})</p>
                          <div className="space-y-2 max-h-96 overflow-y-auto">
                            {doc.measurements.map((measurement, idx) => (
                              <div key={idx} className="bg-muted rounded-lg p-3">
                                <p className="text-xs text-muted-foreground mb-1">
                                  {new Date(measurement.timestamp).toLocaleString()}
                                </p>
                                <pre className="text-xs overflow-x-auto">
                                  {formatValue(measurement.data)}
                                </pre>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sessions */}
                      {doc.sessions && doc.sessions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Sessions ({doc.sessions.length})</p>
                          <div className="space-y-2 max-h-96 overflow-y-auto">
                            {doc.sessions.map((session, idx) => (
                              <div key={idx} className="bg-muted rounded-lg p-3">
                                <pre className="text-xs overflow-x-auto">
                                  {formatValue(session)}
                                </pre>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Entries */}
                      {doc.entries && doc.entries.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Entries ({doc.entries.length})</p>
                          <div className="space-y-2 max-h-96 overflow-y-auto">
                            {doc.entries.map((entry, idx) => (
                              <div key={idx} className="bg-muted rounded-lg p-3">
                                <p className="text-xs text-muted-foreground mb-1">
                                  {new Date(entry.timestamp).toLocaleString()}
                                </p>
                                <pre className="text-xs overflow-x-auto">
                                  {formatValue(entry.data)}
                                </pre>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Data Origins for this doc */}
                      {doc.dataOrigins && doc.dataOrigins.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Sources:</p>
                          <div className="flex flex-wrap gap-1">
                            {doc.dataOrigins.map((origin, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {origin.replace('com.google.android.apps.', '').replace('com.', '')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryDetails;
