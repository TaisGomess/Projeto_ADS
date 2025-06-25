import ResponsavelModel from "../../Models/ResponsavelModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const requestBody = request.body;
    const id = request.params.id;

    const { nome, email, telefone, esta_ativo, aluno_id } = requestBody;

    const data = {};

    if (nome !== undefined) data["nome"] = nome;
    if (email !== undefined) data["email"] = email;
    if (telefone !== undefined) data["telefone"] = telefone;
    if (esta_ativo !== undefined) data["esta_ativo"] = esta_ativo;
    if (aluno_id !== undefined) data["aluno_id"] = aluno_id;

    if (Object.keys(data).length === 0) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: `Nenhum campo foi informado para atualizar o responsável com ID ${id}.`
        });
    }

    try {
        const [rowsAffected, [registroAtualizado]] = await ResponsavelModel.update(
            data,
            {
                where: { id: id },
                returning: true
            }
        );

        if (rowsAffected === 0 || !registroAtualizado) {
            return response.status(HTTP_STATUS.NOT_FOUND).json({
                error: `Responsável com ID ${id} não foi encontrado.`
            });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(registroAtualizado);

    } catch (error) {
        return response.status(HTTP_STATUS.SERVER_ERROR).json({
            error: 'Erro ao atualizar os dados do responsável.'
        });
    }
};