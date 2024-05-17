import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Snippet } from "@nextui-org/snippet";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

/**
 * O componente AlertAuthor exibe um modal com um aviso importante para os usuários.
 * Ele também inclui uma opção para ocultar o aviso no futuro.
 * @param children Conteúdo a ser renderizado junto com o modal de aviso.
 */
export default function AlertAuthor({ children }: { children: ReactNode }) {
    const [hideValue, setHideValue] = useState<boolean>(); // Estado para controlar se o aviso deve ser ocultado
    const [modalOpen, setModal] = useState<boolean>(); // Estado para controlar a abertura e fechamento do modal

    // Verifica se o aviso deve ser exibido ou ocultado com base no valor armazenado no localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            let cachedValue = localStorage.getItem('hideAlert');
            if (cachedValue && cachedValue === 'hide') {
                setHideValue(true); // Oculta o aviso se o valor armazenado for 'hide'
                setModal(false); // Fecha o modal
            } else {
                setHideValue(false); // Exibe o aviso
                setModal(true); // Abre o modal
            }
        }
    }, []);

    // Função para lidar com a mudança do valor de ocultar o aviso
    const handleChangeValueInput = (value: boolean) => {
        if (typeof window !== 'undefined') {
            if (value) {
                localStorage.setItem('hideAlert', 'hide'); // Define o valor no localStorage como 'hide'
                setHideValue(true); // Atualiza o estado para ocultar o aviso
            } else {
                localStorage.setItem('hideAlert', 'nohide'); // Define o valor no localStorage como 'nohide'
                setHideValue(false); // Atualiza o estado para exibir o aviso
            }
        }
    }

    return (
        <>
            <Modal
                size="5xl"
                isOpen={modalOpen}
                onOpenChange={setModal}
                backdrop="opaque"
            >
                <ModalContent>
                    {/* Cabeçalho do modal */}
                    <ModalHeader className="flex flex-row gap-1 items-center justify-center">
                        <p>Aviso Importante</p>
                    </ModalHeader>
                    <ModalBody className="flex flex-col gap-2 pb-4">
                        {/* Corpo do modal com o conteúdo do aviso */}
                        <div className="flex flex-col gap-2">
                            <p>
                                Bem-vindo ao site de qualificação para a vaga em Oak Tecnologias <br />
                                Este site faz parte do processo de seleção para uma vaga na Oak Tecnologias e foi desenvolvido por Matheus Motta. Instruções para utilizar as funcionalidades do site estarão abaixo. <br />
                            </p>
                            <span>Atenciosamente, Matheus Motta</span>
                        </div>
                        <div className="flex mt-2 flex-col">
                            {/* Instruções de utilização do site */}
                            <p>
                                Para adicionar produtos, desativá-los e editá-los, vá até o <Link href="/painel/">painel do administrador</Link> e utilize os dados abaixo para fazer login.
                            </p>
                            <div className="flex flex-col mt-2 items-start gap-2">
                                <div className="flex flex-col gap-1">
                                    <p>Usuário</p>
                                    <Snippet color="default" variant="flat">
                                        admin
                                    </Snippet>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p>Senha</p>
                                    <Snippet color="default" variant="flat">
                                        admin1234
                                    </Snippet>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-6 gap-2">
                            {/* Checkbox para ocultar o aviso */}
                            <Checkbox defaultChecked={hideValue} /* onChange={(e) => handleChangeValueInput(e.target)} */>Não quero ver esse aviso novamente</Checkbox>
                            {/* Botão para fechar o modal */}
                            <Button onClick={() => setModal(false)} color="primary" variant="flat" fullWidth>Fechar</Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* Renderiza o conteúdo fornecido junto com o modal de aviso */}
            {children}
        </>
    );
}
