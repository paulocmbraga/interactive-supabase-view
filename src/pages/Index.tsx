import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Play, Bell, Trophy, Target, CheckCircle, UserCheck, BarChart3 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import DateRangeFilter from "@/components/DateRangeFilter";
import React, { useState, useMemo } from "react";

const Index = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  console.log("Filtros ativos:", { startDate, endDate });

  // Query para buscar dados dos alunos
  const { data: alunos, isLoading: loadingAlunos } = useQuery({
    queryKey: ['alunos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alunos')
        .select('*');
      if (error) throw error;
      console.log("Dados dos alunos:", data);
      return data;
    }
  });

  // Query para buscar dados de anamnese (perfilamentos)
  const { data: anamneses, isLoading: loadingAnamneses } = useQuery({
    queryKey: ['anamneses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('anamnese')
        .select('*');
      if (error) throw error;
      console.log("Dados das anamneses (TODOS):", data);
      console.log("Quantidade total de anamneses no banco:", data?.length || 0);
      return data;
    }
  });

  // Query para buscar logs de visualização (plays)
  const { data: logViews, isLoading: loadingLogs } = useQuery({
    queryKey: ['log_views'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('log_view')
        .select('*');
      if (error) throw error;
      console.log("Dados dos log_views:", data);
      return data;
    }
  });

  // Query para buscar histórico de chat (bem-vindas e lembretes)
  const { data: chatHistories, isLoading: loadingChat } = useQuery({
    queryKey: ['chat_histories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('n8n_chat_histories')
        .select('*');
      if (error) throw error;
      console.log("Dados do chat histories:", data);
      return data;
    }
  });

  // Função para filtrar dados por período
  const filterDataByDate = (data: any[], dateField: string) => {
    if (!data || (!startDate && !endDate)) return data;
    
    return data.filter(item => {
      const itemDate = new Date(item[dateField]);
      if (startDate && itemDate < startDate) return false;
      if (endDate && itemDate > endDate) return false;
      return true;
    });
  };

  // Dados filtrados
  const filteredAnamneses = useMemo(() => {
    const filtered = filterDataByDate(anamneses || [], 'created_at');
    console.log("Anamneses ANTES do filtro:", anamneses?.length || 0);
    console.log("Anamneses DEPOIS do filtro:", filtered?.length || 0);
    console.log("Anamneses filtradas (detalhes):", filtered);
    return filtered;
  }, [anamneses, startDate, endDate]);

  const filteredLogViews = useMemo(() => {
    const filtered = filterDataByDate(logViews || [], 'created_at');
    console.log("Log views filtrados:", filtered);
    return filtered;
  }, [logViews, startDate, endDate]);

  const filteredChatHistories = useMemo(() => {
    const filtered = filterDataByDate(chatHistories || [], 'timestamptz');
    console.log("Chat histories filtrados:", filtered);
    return filtered;
  }, [chatHistories, startDate, endDate]);

  if (loadingAlunos || loadingAnamneses || loadingLogs || loadingChat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Carregando KPIs do Weburn...</p>
        </div>
      </div>
    );
  }

  // Cálculos dos KPIs com dados filtrados
  const totalAlunos = alunos?.length || 0;
  const alunosAtivos = alunos?.filter(aluno => aluno.plano_ativo)?.length || 0;
  const totalPerfilamentos = filteredAnamneses?.length || 0;
  const totalPlays = filteredLogViews?.length || 0;
  const totalInteracoes = filteredChatHistories?.length || 0;

  console.log("KPIs calculados:", {
    totalAlunos,
    alunosAtivos,
    totalPerfilamentos,
    totalPlays,
    totalInteracoes
  });

  // Cálculo de plays por aluno com dados filtrados
  const playssPorAluno = filteredLogViews?.reduce((acc, log) => {
    const alunoId = log.aluno_id;
    if (alunoId && typeof alunoId === 'number') {
      acc[alunoId] = (acc[alunoId] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>) || {};

  const mediaPlaysPorAluno = Object.keys(playssPorAluno).length > 0 
    ? Number((Object.values(playssPorAluno).reduce((a: number, b: number) => a + b, 0) / Object.keys(playssPorAluno).length).toFixed(1))
    : 0;

  // Ranking de cursos por plays com dados filtrados
  const cursoRanking = filteredLogViews?.reduce((acc, log) => {
    const curso = log.nome_curso;
    if (curso && typeof curso === 'string') {
      acc[curso] = (acc[curso] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>) || {};

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const rankingData = Object.entries(cursoRanking)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([curso, plays], index) => ({
      curso,
      plays: plays as number,
      color: COLORS[index % COLORS.length],
    }));

  // Dados para gráfico de engajamento com dados filtrados
  const engajamentoData = [
    { name: 'Ativações', value: alunosAtivos },
    { name: 'Perfilamentos', value: totalPerfilamentos },
    { name: 'Plays Totais', value: totalPlays },
    { name: 'Interações', value: totalInteracoes }
  ];

  const chartConfig = {
    plays: {
      label: "Plays",
      color: "#3b82f6",
    },
  };

  const handleClearFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Agente Onboarding | Sérgio Bertolucci</h1>
          <p className="text-xl text-gray-600">Acompanhamento de Onboarding</p>
        </div>

        {/* Filtro por Período */}
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onClearFilter={handleClearFilter}
        />

        {/* Indicador de Filtro Ativo */}
        {(startDate || endDate) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <strong>Filtro ativo:</strong> {startDate ? `de ${startDate.toLocaleDateString('pt-BR')}` : 'desde o início'} 
              {endDate ? ` até ${endDate.toLocaleDateString('pt-BR')}` : ' até hoje'}
            </p>
          </div>
        )}

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ativações</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{alunosAtivos}</div>
              <p className="text-xs text-gray-500">de {totalAlunos} alunos totais</p>
              <Progress value={(alunosAtivos / totalAlunos) * 100} className="mt-2" indicatorClassName="bg-green-600" />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Bem-vindas</CardTitle>
              <UserCheck className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{totalInteracoes}</div>
              <p className="text-xs text-gray-500">interações registradas</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Perfilamentos</CardTitle>
              <Users className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{totalPerfilamentos}</div>
              <p className="text-xs text-gray-500">anamneses concluídas</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Plays Totais</CardTitle>
              <Play className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{totalPlays}</div>
              <p className="text-xs text-gray-500">visualizações de conteúdo</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg lg:col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                Ranking de Cursos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[350px] w-full pb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingData} margin={{ bottom: 20 }}>
                    <YAxis fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="plays" radius={[4, 4, 0, 0]}>
                      {rankingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <Legend 
                      content={({ payload }) => (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:pl-4 lg:pl-8" style={{ marginTop: '30px' }}>
                          {rankingData.map((entry, index) => (
                            <div key={`legend-${index}`} className="flex items-center gap-2">
                              <div 
                                className="h-3 w-3"
                                style={{
                                  backgroundColor: entry.color,
                                }}
                              ></div>
                              <span className="text-sm text-gray-700">{entry.curso}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas Detalhadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-red-600" />
                Taxa de Conversão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {totalAlunos > 0 ? ((Object.keys(playssPorAluno).length / totalAlunos) * 100).toFixed(1) : 0}%
              </div>
              <p className="text-sm text-gray-500">de alunos com plays</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-600" />
                Engajamento Médio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">
                {mediaPlaysPorAluno}
              </div>
              <p className="text-sm text-gray-500">plays por aluno</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-600" />
                Média de Recomendações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-600">
                {totalAlunos > 0 ? ((totalPerfilamentos / totalAlunos) * 100).toFixed(1) : 0}%
              </div>
              <p className="text-xs text-gray-500">anamneses concluídas</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
