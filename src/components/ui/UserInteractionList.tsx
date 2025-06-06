import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle2, MessageCircle, XCircle, Download, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface ChatMessage {
  id: number;
  session_id: string;
  timestamptz: string;
  message: any;
}

interface UserInteraction {
  aluno_id: number;
  nome: string;
  email: string;
  tem_perfilamento: boolean;
  ultima_interacao: string;
  total_interacoes: number;
  yupchat_id?: string;
}

interface UserInteractionListProps {
  users: UserInteraction[];
  chatHistories?: ChatMessage[];
}

export function UserInteractionList({ users, chatHistories }: UserInteractionListProps) {
  const [openUserId, setOpenUserId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const USERS_PER_PAGE = 15;
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const paginatedUsers = users.slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE);

  // Função para buscar as mensagens do usuário selecionado
  const getUserMessages = (user: UserInteraction) => {
    if (!chatHistories) return [];
    return chatHistories
      .filter(msg => msg.session_id === user.yupchat_id)
      .sort((a, b) => new Date(a.timestamptz).getTime() - new Date(b.timestamptz).getTime());
  };

  return (
    <ScrollArea className="h-[780px] w-full rounded-md p-4 bg-[#1a1a1a]">
      <div>
        <div className="flex items-center gap-2 mb-4 text-[#00ff88] text-2xl font-bold">
          <Users className="h-7 w-7" />
          Usuários que Interagiram com a IA
        </div>
        <div className="flex items-center justify-between mb-2">
          <PaginationControls page={page} totalPages={totalPages} setPage={setPage} />
        </div>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-muted-foreground/10">
              <th className="px-4 py-2 font-semibold text-white">Nome</th>
              <th className="px-4 py-2 font-semibold text-white">Email</th>
              <th className="px-4 py-2 font-semibold text-white">Status</th>
              <th className="px-4 py-2 font-semibold text-white">Data</th>
              <th className="px-4 py-2 font-semibold text-white">Interações</th>
              <th className="px-4 py-2 font-semibold text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.aluno_id} className="border-b border-muted-foreground/5 hover:bg-accent/30">
                <td className="px-4 py-2 whitespace-nowrap text-white">{user.nome}</td>
                <td className="px-4 py-2 whitespace-nowrap text-[#bdbdbd]">{user.email}</td>
                <td className="px-4 py-2">
                  {user.tem_perfilamento ? (
                    <span className="inline-flex items-center rounded-full bg-green-600/90 px-4 py-1 text-xs font-semibold text-white gap-1">
                      <CheckCircle2 size={16} className="mr-1" /> Completo
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-600/90 px-4 py-1 text-xs font-semibold text-white gap-1">
                      <XCircle size={16} className="mr-1" />
                      Pendente
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-[#bdbdbd]">{format(new Date(user.ultima_interacao), "dd/MM/yyyy", { locale: ptBR })}</td>
                <td className="px-4 py-2 text-center text-[#bdbdbd]">{user.total_interacoes}</td>
                <td className="px-4 py-2">
                  <Dialog open={openUserId === user.aluno_id} onOpenChange={open => setOpenUserId(open ? user.aluno_id : null)}>
                    <DialogTrigger asChild>
                      <button className="inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 transition">
                        <MessageCircle size={16} /> Ver conversas
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-[#1a1a1a] border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-[#00ff88]">Conversas de {user.nome}</DialogTitle>
                        <div className="flex justify-end mt-2">
                          <ExportChatButton messages={getUserMessages(user)} userName={user.nome} />
                        </div>
                      </DialogHeader>
                      <div className="max-h-[400px] overflow-y-auto space-y-2 mt-4">
                        {getUserMessages(user).length === 0 ? (
                          <div className="text-center text-gray-400">Nenhuma mensagem encontrada.</div>
                        ) : (
                          getUserMessages(user).map(msg => {
                            const isLead = typeof msg.message === 'object' && msg.message.type === 'human';
                            return (
                              <div 
                                key={msg.id} 
                                className={`rounded border border-gray-700 p-3 text-white ${
                                  isLead ? 'bg-[#666]' : 'bg-[#353535]'
                                }`}
                              >
                                <div className="text-xs text-zinc-400 mb-1">{format(new Date(msg.timestamptz), "dd/MM/yyyy HH:mm", { locale: ptBR })}</div>
                                <div className="break-words">
                                  {typeof msg.message === 'string' ? msg.message : msg.message.content}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  );
}

// Componente para exportação
function ExportChatButton({ messages, userName }: { messages: any[], userName: string }) {
  const [open, setOpen] = useState(false);

  const handleExport = (type: 'csv' | 'json') => {
    if (type === 'json') {
      const json = JSON.stringify(messages, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `conversa_${userName.replace(/\s+/g, '_').toLowerCase()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // CSV
      const header = 'Data,Mensagem';
      const rows = messages.map(msg => {
        const data = new Date(msg.timestamptz).toLocaleString('pt-BR');
        const content = typeof msg.message === 'string' ? msg.message : (msg.message.content || '');
        return `"${data}","${content.replace(/"/g, '""')}"`;
      });
      const csv = [header, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `conversa_${userName.replace(/\s+/g, '_').toLowerCase()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-3 py-1 rounded bg-[#00ff88] text-black font-semibold hover:bg-[#00ff88]/80 transition"
        onClick={() => setOpen(o => !o)}
        title="Exportar conversa"
      >
        <Download size={16} /> Exportar
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-[#222] border border-gray-700 rounded shadow-lg z-10">
          <button className="block w-full px-4 py-2 text-left hover:bg-[#333] text-white" onClick={() => handleExport('csv')}>CSV</button>
          <button className="block w-full px-4 py-2 text-left hover:bg-[#333] text-white" onClick={() => handleExport('json')}>JSON</button>
        </div>
      )}
    </div>
  );
}

// Componente de paginação
function PaginationControls({ page, totalPages, setPage }: { page: number, totalPages: number, setPage: (p: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="px-2 py-1 rounded bg-[#222] text-white border border-gray-700 disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >Anterior</button>
      <span className="text-sm text-gray-300">{page} / {totalPages}</span>
      <button
        className="px-2 py-1 rounded bg-[#222] text-white border border-gray-700 disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >Próxima</button>
    </div>
  );
} 