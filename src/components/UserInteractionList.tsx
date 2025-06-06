import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserInteraction {
  aluno_id: number;
  nome: string;
  email: string;
  tem_perfilamento: boolean;
  ultima_interacao: string;
  total_interacoes: number;
}

interface UserInteractionListProps {
  users: UserInteraction[];
}

export function UserInteractionList({ users }: UserInteractionListProps) {
  const handleExportCSV = () => {
    try {
      // Cabeçalho do CSV
      const headers = [
        "ID",
        "Nome",
        "Email",
        "Perfilamento",
        "Última Interação",
        "Total de Interações"
      ];

      // Dados formatados
      const csvData = users.map(user => [
        user.aluno_id,
        user.nome,
        user.email,
        user.tem_perfilamento ? "Completo" : "Pendente",
        new Date(user.ultima_interacao).toLocaleDateString('pt-BR'),
        user.total_interacoes
      ]);

      // Combinar cabeçalho e dados
      const csvContent = [
        headers.join(";"),
        ...csvData.map(row => row.join(";"))
      ].join("\n");

      // Criar blob e link para download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      link.href = url;
      link.setAttribute("download", `usuarios_ia_${new Date().toLocaleDateString('pt-BR')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      alert("Ocorreu um erro ao exportar o arquivo. Por favor, tente novamente.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button 
          onClick={handleExportCSV}
          className="bg-[#00ff88] text-black hover:bg-[#00ff88]/90 flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>
      <div className="rounded-md border border-gray-700 bg-[#1a1a1a]">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-[#2d2d2d]">
              <TableHead className="text-gray-300">Nome</TableHead>
              <TableHead className="text-gray-300">Email</TableHead>
              <TableHead className="text-gray-300">Perfilamento</TableHead>
              <TableHead className="text-gray-300">Última Interação</TableHead>
              <TableHead className="text-gray-300">Total de Interações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.aluno_id} className="border-gray-700 hover:bg-[#2d2d2d]">
                <TableCell className="font-medium text-gray-300">{user.nome}</TableCell>
                <TableCell className="text-gray-400">{user.email}</TableCell>
                <TableCell>
                  {user.tem_perfilamento ? (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Completo
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <XCircle className="h-4 w-4" />
                      Pendente
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-gray-400">{new Date(user.ultima_interacao).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell className="text-gray-400">{user.total_interacoes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 